import PouchDB from 'pouchdb-browser';
PouchDB.plugin(require('pouchdb-upsert'));

class PouchInstance {
  constructor() {
    if(!PouchInstance.instance) {

      this.db = new PouchDB('caterpillardb');
      PouchInstance.instance = this;

    }

    return PouchInstance.instance;
  }

}

const instance = new PouchInstance();
Object.freeze(instance);

export default instance;
