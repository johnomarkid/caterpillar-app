import * as firebase from 'firebase';
import config from './config/common';

class FirebaseInstance {
    constructor() {
        if (!FirebaseInstance.instance) {
            const c = config();
            this.firebase = firebase.initializeApp({
                apiKey: c.firebase_api_key,
                authDomain: c.firebase_auth_domain,
                databaseURL: c.db_url
            })
        }
        return FirebaseInstance.instance
    }
}

const instance = new FirebaseInstance();
Object.freeze(instance);

export default instance


