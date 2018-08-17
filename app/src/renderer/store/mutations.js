import vm, { set } from 'vue'
import firebaseInstance from '../firebase';
const firebase = firebaseInstance.firebase;

export default {
  updateRoute(state, route) {
    if (!firebase.auth().currentUser) {
      state.route = 'login'
    }
    else state.route = route;
  },
  defaultState(state) {
    state.active.video = null;
    state.videos = {allIds: [], byId: {}};
    state.sections = null;
    state.skills = null;
    state.subtitles = null;
    state.history = null;
  },
	updateActive(state, {activeVideo, videos, sections, skills, subtitles, skHistory}) {
		state.active.video = activeVideo.video;
		state.videos = videos;
		state.sections = sections;
		state.skills = skills;
		state.subtitles = subtitles;
		state.history = skHistory;
    state.route = 'learn';
		return state;
	},
	updateVideo(state, val) {
		const vidId = state.active.video;
		set(state.videos.byId, vidId, val);
	},
  updateSection(state, section) {
    set(state.sections.byId, section._id, section); 
  },
  updateSkill(state, skill) {
    set(state.skills.byId, skill._id, skill);
  },
  updateSubtitle(state, subtitle) {
    set(state.subtitles.byId, subtitle._id, subtitle);
  },
	updateSkillRev(state, sk) {
		const skill = state.skills.byId[sk.id]
		skill._rev = sk.rev;
		set(state.skills.byId, skill._id, skill)
	},
  updateVideos(state, vids) {
    state.videos.allIds = vids;
  },
	updateHistory(state, history) {
		state.history = history;
	},
	didReview(state) {
		const sec = getActiveSection(state);
		sec.isGrading = true;
	},
	didGrade(state, {skill, grade}) {
		// set section to move to next skill
		const sec = getActiveSection(state);
		sec.activeSkillIndex += 1;
		sec.isGrading = false;

		// repeatIds: []
    /*
		if (skill.interval == 0) {
			const repeats = sec.repeatIds;
			repeats.push(skill._id);
		}
    */

		set(state.sections.byId, sec._id, sec);
	},
  isDeletingSkill(state, skill) {
    skill.isDeleting = true;
  },
  didDeleteSkill(state, skill) {
    const sec = state.sections.byId[skill.section];
    const skIndex = sec.skillIds.indexOf(skill._id);
    sec.skillIds.splice(skIndex, 1);
    state.sections.byId[sec._id].skillIds = sec.skillIds;
    sec.isGrading = false;

    const repIndex = sec.repeatIds.indexOf(skill._id);
    if(repIndex) {
      sec.repeatIds.splice(repIndex, 1);
      state.sections.repeatIds = sec.repeatIds;
    }

    const newSkillIds = state.skills.allIds;
    const dskIndex = newSkillIds.indexOf(skill._id);
    newSkillIds.splice(dskIndex);
    state.skills.allIds = newSkillIds;

    vm.delete(state.skills.byId, skill._id);
  }, 
  isLoadingView(state, val) {
    state.ui.isLoadingView = val
  },
  togglePremiumBlockModal(state) {
    state.ui.isPremiumBlockModal = !state.ui.isPremiumBlockModal
  }
}

function getActiveSection(state) {
	const vid = state.videos.byId[state.active.video];
	const actsec = vid.activeSection;
	return state.sections.byId[actsec];
}
