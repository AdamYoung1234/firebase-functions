import { firestore } from "firebase-admin";

class Vendors {
    db: firestore.Firestore;

    constructor(db: firestore.Firestore) {
      this.db = db;
    }

    async getAll() {
      const snapshot = await this.db.collection('vendors').get();
      const vendorsInformation: { id: string; data: firestore.DocumentData; }[] = [];

      snapshot.forEach((doc) => {
        vendorsInformation.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      return vendorsInformation;
    }

    async get(id: string) {
      const doc = await this.db.collection('vendors').doc(id).get();

      return { id:doc.id, data: doc.data() };
    }

    async create(body: object) {
      const docRef = await this.db.collection('vendors').add(body);
      const doc = await docRef.get();

      return { id: doc.id, data: doc.data() };
    }

    async delete(id: string) {
      let result = await this.db.collection('vendors').doc(id).delete();

      return result;
    }

    async update(id: string, body: object) {
      const result = await this.db.collection('vendors').doc(id).set(body);

      return result;
    }
}

export default Vendors;
