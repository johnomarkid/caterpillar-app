import * as firebase from 'firebase';

class DiscoverFirebaseInstance {
    constructor() {
        if (!DiscoverFirebaseInstance.discoverInstance) {
            this.firebase = firebase.initializeApp({
                apiKey: "AIzaSyAjDaS1XQYle1Od600NLho3zTRGN-QIvqc",
                databaseURL: "https://caterpillar-discovery.firebaseio.com",
                messagingSenderId: "665089491687"
            }, 'discover-db')
        }
        return DiscoverFirebaseInstance.discoverInstance
    }
}

const discoverInstance = new DiscoverFirebaseInstance();
Object.freeze(discoverInstance);

export default discoverInstance;