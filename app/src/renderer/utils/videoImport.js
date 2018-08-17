import { parseSrtFromPath } from '../utils/srtParser';
import { todayDate } from '../utils/dateHelper';
// start saving things to pouch

function flatten(array, mutable) {
  var nodes = (mutable && array) || array.slice(); // return a new array.
  var flattened = [];

  for (var node = nodes.shift(); node !== undefined; node = nodes.shift()) {
    if (Array.isArray(node)) {
      nodes.unshift.apply(nodes, node);
    } else {
      flattened.push(node);
    }
  }

  return flattened;
}

function buildSkills(video, subtitles) {
  const videoIdParsed = video.split('_').slice(-1)[0];
  const skills = subtitles.map(subtitle => {
  const secIdParsed = subtitle.section.split('_').slice(-1)[0];
    return ['listen', 'write', 'repeat'].map(phase => {
			return { 
				_id: `skill_${videoIdParsed}_${secIdParsed}_${subtitle.index}_${phase}`,
				type: 'skill',
				video,
				section: subtitle.section,
				subtitle: subtitle._id,
				phase,
				repeat: false,
				ef: 2.5,
				nextDate: todayDate(),
				prevDate: todayDate(),
				interval: 0,
				reps: 0,
    }})
  })

  return flatten(skills);
}

function buildSubtitles(video, sections, secGroups) {
  const videoIdParsed = video.split('_').slice(-1)[0];
  const subtitles = secGroups.map((section, idx) => {
      const secIdParsed = sections[idx]._id.split('_').slice(-1)[0];
      return section.map(subtitle => {
        const subIndex = subtitle.id;
        return {
          _id: `subtitle_${videoIdParsed}_${secIdParsed}_${subIndex}`,
          type: 'subtitle',
          index: subIndex,
          video,
          section: sections[idx]._id,
          text: subtitle.text,
          startTime: subtitle.startTime,
          endTime: subtitle.endTime,
        }})
  })

  return flatten(subtitles);
}

function buildSections(video, sections) {
  return sections.map((sec, idx) => {
    const videoIdParsed = video.split('_').slice(-1)[0];
    return {
      _id: `section_${videoIdParsed}_${idx}`,
      index: idx,
      startTime: sec[0].startTime,
      endTime: sec.slice(-1)[0].endTime,
      type: 'section',
      video,
			isStarted: false,
    } 
  });
}

function partition(arr, length) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (i % length === 0) result.push([]);
    result[result.length - 1].push(arr[i]);
  }
  return result;
}

function videoImport({ videoSrc, subtitleSrc, videoTitle }, db, cb) {
  const videoId = `video_${videoTitle}`;
  const subtitles = parseSrtFromPath(subtitleSrc);
  console.log('subtitles: ', subtitles)
  const sectionGroups = partition(subtitles, 30);
  const sections = buildSections(videoId, sectionGroups);
  const parsedSubtitles = buildSubtitles(videoId, sections, sectionGroups);
  const skills = buildSkills(videoId, parsedSubtitles);
  const video = [{
    _id: videoId,
    type: 'video',
		activeSection: sections[0]._id,
    videoSrc,
    subtitleSrc,
    videoTitle,
    dateAdded: todayDate(),
  }]

  const parsedCourse = video.concat(sections, parsedSubtitles, skills);

  db.bulkDocs(
    parsedCourse
  ).then((res) => {
		// create act video if first time
		return db.get('active-data')
	}).then(res => {
		cb(videoId);
	}).catch(err => {
		db.put({
			_id: 'active-data',
			video: videoId,
		}).then(res => {
			cb(videoId);
		})
	});
}

export { videoImport };
