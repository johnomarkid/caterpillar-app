import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
    route: 'loading',
    isPremium: false,
    authToken: null,
		active: {
      video: null
    },
    videos: {
      byId: {},
      allIds: [],
    },
		sections: {},
		skills: {},
		subtitles: {},
		history: {},
    ui: {
      isLoadingView: false,
      isPremiumBlockModal: false,
    }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})
