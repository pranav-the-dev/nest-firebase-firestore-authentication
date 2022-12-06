import admin from 'firebase-admin';
import Firestore = admin.firestore.Firestore;

export class FirestoreService {
  constructor() {
    !admin.apps.length
      ? admin.initializeApp({
          credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY,
          }),
          databaseURL: process.env.FIREBASE_DATABASE_URL,
        })
      : admin.app();
  }

  fireStore(): Firestore {
    console.log('🚀 ~ file: firestore.service.ts ~ line 20 ~ FirestoreService ~ fireStore ~ admin.firestore()', admin.firestore());
    return admin.firestore();
  }
}
