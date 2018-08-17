export const videos = state => {
	return state.videos.allIds.map(id => state.videos.byId[id])
} 

export const activeVideo = state => {
	return state.active.video 
		? state.videos.byId[state.active.video]
		: null
}

export const sections = state => {
	const sorted = state.sections.allIds.sort((a, b) => a[1] - b[1])
  return sorted.map(id => {
    const sec = state.sections.byId[id[0]];
    return sec
  })
}

export const isLoadingView = state => {
  return state.ui.isLoadingView
}

export const completedHistory = state => {
	const hist = state.history.completedSkills;
	const histMap = hist.reduce((map, sk) => {
		const vidId = sk[0];
		const skId = sk[1];
		if (map[vidId]) {
			map[vidId].push(skId);
		}
		else {
			map[vidId] = [skId];
		}
		return map
	}, {})

	return histMap
}

