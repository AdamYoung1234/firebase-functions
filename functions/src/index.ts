import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

import vendorsRoute from './route/vendors';

exports.vendors = functions.https.onRequest(vendorsRoute);
