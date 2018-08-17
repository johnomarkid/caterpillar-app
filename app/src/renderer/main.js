import Vue from 'vue'
import Electron from 'vue-electron'
import Resource from 'vue-resource'
import store from './store';
import { authUser, fetchActiveState } from './store/actions'

Vue.use(Electron)
Vue.use(Resource)
Vue.config.debug = true

import App from './App'

import firebaseInstance from './firebase';
const firebase = firebaseInstance.firebase;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // find if paid
    firebase.database().ref('/users/' + user.uid).once('value')
    .then(snapshot => {
      const val = snapshot.val();
      // user shouldn't be in db if no payment. only in auth db.
      try {
        if (val.payments) {
          store.state.isPremium = true
        }
        else {
          store.state.isPremium = false
        }
      }
      catch(err) {
        store.state.isPremium = false
      }
      ga('set', '&uid', user.email);
      fetchActiveState(store)
    })
  }
  else {
    authUser(store)
  }

  initHelpscout();
})

function initHelpscout() {
  HS.beacon.ready(function () {
    // set user email
    if (firebase.auth().currentUser) {
      HS.beacon.identify({
        email: firebase.auth().currentUser.email
      })
    }
  });
}

new Vue({
  ...App,
	store,
}).$mount('#app');