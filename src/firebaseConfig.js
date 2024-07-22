import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "elibuilds-998b8.firebaseapp.com",
  databaseURL: "https://elibuilds-998b8-default-rtdb.firebaseio.com",
  projectId: "elibuilds-998b8",
  storageBucket: "elibuilds-998b8.appspot.com",
  messagingSenderId: "957856164365",
  appId: "1:957856164365:web:0e463ae69eb465f6814344",
  measurementId: "G-CZQR5QZVP4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export { app, db, auth };
