// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "your api key",
  authDomain: "your authDomain",
  projectId: "your project ID",
  storageBucket: "your storage bucket",
  messagingSenderId: "your messagingSenderID",
  appId: "your appId",
  measurementId: "your measurement Id",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
