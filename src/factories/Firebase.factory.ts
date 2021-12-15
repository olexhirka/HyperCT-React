import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from 'config';

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();

export const firestoreDB = app.firestore();

export default app;
