import { firestore } from 'firebase-admin';
import schemaValidator from './VendorsSchemaValidator';

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
      // do data validation
      const { error, value } = schemaValidator.validate(body);

      if(error) {
        const errorMessages = error.details.map((detail: { message: string; }) => detail.message);

        return {
          error: errorMessages,
        };
      }

      // check for duplicated email
      if(await this.existed(value.profile.access.email)) {
        return {
          error: 'Email has already been used.',
        };
      }

      const docRef = await this.db.collection('vendors').add(value);
      const doc = await docRef.get();

      return { id: doc.id, data: doc.data() };
    }

    async delete(id: string) {
      let result = await this.db.collection('vendors').doc(id).delete();

      return result;
    }

    async update(id: string, body: object) {
      // do data validation
      const { error, value } = schemaValidator.validate(body);

      if(error) {
        const errorMessages = error.details.map((detail: { message: string; }) => detail.message);

        return {
          error: errorMessages,
        };
      }

      const result = await this.db.collection('vendors').doc(id).set(value);

      return result;
    }

    async getByEmail(email: string) {
      const docs = await this.db.collection('vendors').where('profile.access.email', '==', email).get();
      let result = {};

      docs.forEach((doc) => {
        result = {id: doc.id, data: doc.data()};  
      })

      return result;
    }

    async existed(email: string) {
      const docs = await this.db.collection('vendors').where('profile.access.email', '==', email).get();
      console.log(docs.size);
      return docs.size !== 0;
    }
}

export default Vendors;
