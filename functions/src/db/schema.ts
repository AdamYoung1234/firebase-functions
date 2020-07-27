import * as admin from 'firebase-admin';
import VendorSchema from './schema/Vendors/Vendors';

// Get firestore instance
let db = admin.firestore();

const Vendors = new VendorSchema(db);

export { Vendors };
