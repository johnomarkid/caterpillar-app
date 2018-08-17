import pouch from '../db';
import { videoImport } from '../utils/videoImport';
import { todayDate } from '../utils/dateHelper';
import { shuffle } from '../utils/helpers';
import { calcIntervalEF } from '../utils/helpers';
import firebaseInstance from '../firebase';
const { shell } = require('electron')

const db = pouch.db;
const firebase = firebaseInstance.firebase;

export const upgradeClicked = () => {
	shell.openExternal('https://caterpillarapp.tv/payment')
	ga('send', 'event', 'Upgrade', 'Clicked')
}

export const deleteVideo = async ({ commit, dispatch, state }, vidId) => {
	// make another active or if none then nothing active
	// pull all for this vid
	// put {_deleted: true} in each doc
	// put
	try {
		const video = await db.get(vidId);
		video._deleted = true;

		const vidTitle = vidId.split('_').slice(-1)[0];
		const dSubtitles = await db.allDocs({
			include_docs: true,
			startkey: `subtitle_${vidTitle}`,
			endkey: `subtitle_${vidTitle}\uffff`,
		})
		const subtitles = dSubtitles.rows.map((sub) => {
			sub.doc._deleted = true;
			return sub.doc
		})

		const dSkills = await db.allDocs({
			include_docs: true,
			startkey: `skill_${vidTitle}`,
			endkey: `skill_${vidTitle}\uffff`,
		})
		const skills = dSkills.rows.map((sk) => {
			sk.doc._deleted = true;
			return sk.doc
		})

		const dSections = await db.allDocs({
			include_docs: true,
			startkey: `section_${vidTitle}`,
			endkey: `section_${vidTitle}\uffff`,
		})
		const sections = dSections.rows.map((sec) => {
			sec.doc._deleted = true;
			return sec.doc
		})

		if (vidId == state.active.video) {
			if (state.videos.allIds.length < 2) {
				// no active vid
				commit('defaultState');
			}
			else {
				// need to find new active
				state.videos.allIds.forEach((vid) => {
					if (vid != vidId) {
						dispatch('updateActiveVideo', vid);
					}
				})
			}
		}
		else {
			// remove from video ids
			const vids = state.videos.allIds;
			const ind = vids.indexOf(vidId);
			vids.splice(ind, 1);
			commit('updateVideos', vids);
		}

		const toDelete = [video].concat(sections, subtitles, skills);
		const deletes = await db.bulkDocs(toDelete);
	}
	catch (err) {
		console.log('ERROR - deleteVideo: ', err)
	}

}

export const replayVideo = () => {
	const vp = document.getElementById('video-player');
	vp.src = vp.src;
	vp.playbackRate = 1.0;
	vp.play();
}

export const slowReplay = () => {
	const vp = document.getElementById('video-player');
	vp.src = vp.src;
	vp.playbackRate = 0.6;
	vp.play();
}

export const addSkillHistory = async ({ commit, state }, skill) => {
	const skHistory = state.history;
	skHistory.completedSkills.push([skill.video, skill._id]);
	try {
		const savedHistory = await db.put({
			...skHistory
		})
		skHistory._rev = savedHistory.rev;
		commit('updateHistory', skHistory);
	}
	catch (err) {
		console.log('ERROR - addSkillHistory: ', err);
	}
}

export const deleteSkill = async ({ commit, state }, skill) => {
	try {
		const dxSkill = await db.remove({
			_id: skill._id,
			_rev: skill._rev,
		})

		commit('didDeleteSkill', skill);
	}
	catch (err) {
		console.log('ERROR - deleteSkill: ', err)
	}
}

export const editSubtitle = async ({ commit, state }, subtitle) => {
	commit('updateSubtitle', subtitle);
	try {
		const dxSubtitle = await db.put({
			...subtitle
		})
		subtitle._rev = dxSubtitle.rev;
		commit('updateSubtitle', subtitle);
	}
	catch (err) {
		console.log('ERROR - editSubtitle: ', err);
	}
}

export const gradeSkill = async ({ dispatch, commit, state }, val) => {
	// save to pouch
	// mutate to get new rev and recall date in skills
	const skill = state.skills.byId[val.skillId];
	const dxSkill = calcIntervalEF(skill, val.grade);
	commit('didGrade', {
		skill: dxSkill,
		grade: val.grade,
	});

	try {
		const savedSkill = await db.put({
			...dxSkill
		})
		commit('updateSkillRev', savedSkill);
		dispatch('addSkillHistory', dxSkill);
		ga('send', 'event', 'Skill', 'Grade');
	}
	catch (err) {
		console.log('ERROR - gradeSkill: ', err)
	}
}

export const sectionStarted = async ({ commit, state }, sectionId) => {
	const section = state.sections.byId[sectionId];
	section.isStarted = true;
	commit('updateSection', section);

	try {
		const dxSection = await db.put({
			...section
		})
		section._rev = dxSection.rev;
		commit('updateSection', section);
	}
	catch (err) {
		console.log('ERROR - sectionStarted: ', err)
	}
}

export const updateActiveSection = async ({ commit, state }, sectionId) => {
	// can only access further sections if have premium account
	if (!state.isPremium) {
		commit('togglePremiumBlockModal')
		return
	}

	const vidId = state.active.video;
	const video = state.videos.byId[vidId];
	video['activeSection'] = sectionId;
	commit('updateVideo', video)

	try {
		const dxVideo = await db.put({
			...video
		})
		video['_rev'] = dxVideo.rev;
		commit('updateVideo', video);
		ga('send', 'event', 'Section', 'Change', 'section', sectionId);
	}
	catch (err) {
		console.log('ERROR - updateActiveSection: ', err);
		// TODO revert to previous active sec
	}
}

export const updateActiveVideo = async ({ commit, dispatch }, videoId) => {
	try {
		const activeVideo = await db.get('active-data');
		await db.put({
			...activeVideo,
			video: videoId,
		})
		dispatch('fetchActiveState');
	}
	catch (err) {
		console.log('ERROR - updateActiveVideo: ', err);
	}
}

export const uploadVideo = async ({ dispatch, commit }, vals) => {
	commit('isLoadingView', true)
	videoImport(vals, pouch.db, (res) => {
		dispatch('updateActiveVideo', res);
		ga('send', 'event', 'Video', 'Upload', vals.videoTitle)
	})
}

export const deleteDB = ({ commit }) => {
	pouch.db.destroy().then(res => {
		console.log("db destroyed? ", res);
	})
}

export const fetchActiveState = async ({ commit }) => {
	commit('isLoadingView', true)
	try {

		const activeVideo = await db.get('active-data');
		const videoTitle = activeVideo.video.split('_').slice(-1)[0]; // TODO write utils for these

		const rawSections = await db.allDocs({
			include_docs: true,
			startkey: `section_${videoTitle}_`,
			endkey: `section_${videoTitle}_\uffff`,
		})

		const dnVideos = await db.allDocs({
			include_docs: true,
			startkey: 'video_',
			endkey: 'video_\uffff',
		})

		const videos = dnVideos.rows.reduce((map, vid) => {
			map.allIds.push(vid.id);
			map.byId[vid.id] = vid.doc;
			return map
		}, {
				byId: {},
				allIds: []
			})

		const dnSections = await Promise.all(rawSections.rows.map(async (sec) => {
			const secIdx = sec.id.split('_').splice(-1)[0];
			const skills = await db.allDocs({
				include_docs: true,
				startkey: `skill_${videoTitle}_${secIdx}_`,
				endkey: `skill_${videoTitle}_${secIdx}_\uffff`,
			})

			const recallSkills = skills.rows.filter(sk => {
				return sk.doc.nextDate <= todayDate()
			})

			return {
				...sec.doc,
				activeSkillIndex: 0,
				isGrading: false,
				skillIds: shuffle(recallSkills.map(sk => sk.id)),
				repeatIds: [],
			}
		}))

		const sections = dnSections.reduce((map, sec) => {
			map.allIds.push([sec._id, sec.index]);
			map.byId[sec._id] = sec;
			return map
		}, {
				byId: {},
				allIds: []
			})

		const dnSkills = await db.allDocs({
			include_docs: true,
			startkey: `skill_${videoTitle}_`,
			endkey: `skill_${videoTitle}_\uffff`,
		})

		const skills = dnSkills.rows.reduce((map, sk) => {
			map.allIds.push(sk.id);
			sk.doc['isEditing'] = false;
			sk.doc['isDeleting'] = false;
			sk.doc['writeReviewText'] = null;
			map.byId[sk.id] = sk.doc;
			return map
		}, {
				byId: {},
				allIds: []
			})

		const dnSubtitles = await db.allDocs({
			include_docs: true,
			startkey: `subtitle_${videoTitle}_`,
			endkey: `subtitle_${videoTitle}_\uffff`,
		})

		const subtitles = dnSubtitles.rows.reduce((map, sub) => {
			map.allIds.push(sub.id);
			map.byId[sub.id] = sub.doc;
			return map
		}, {
				byId: {},
				allIds: []
			})

		const histDate = todayDate();
		const histId = `history_${histDate}`;
		const putSkHistory = await db.putIfNotExists({
			_id: histId,
			completedSkills: [], // [[videoId, skillId]]
		})

		const skHistory = await db.get(histId);

		// get in docs and return normalz
		commit('updateActive', {
			activeVideo,
			videos,
			sections,
			skills,
			subtitles,
			skHistory,
		})

	}
	catch (err) {
		console.log('ERROR - fetchActiveState: ', err);
		commit('isLoadingView', false)
		// error probably means no video. show upload view
		commit('updateRoute', 'upload');
	}
	commit('isLoadingView', false)
}

export const authUser = ({ commit }) => {
	commit('updateRoute', 'login');
}
