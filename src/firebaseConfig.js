import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  // apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
  // authDomain: "elibuilds-998b8.firebaseapp.com",
  // databaseURL: "https://elibuilds-998b8-default-rtdb.firebaseio.com",
  // projectId: "elibuilds-998b8",
  // storageBucket: "elibuilds-998b8.appspot.com",
  // messagingSenderId: "957856164365",
  // appId: "1:957856164365:web:0e463ae69eb465f6814344",
  // measurementId: "G-CZQR5QZVP4",
  // apiKey: "AIzaSyAnkDpJOQO3c-7TiXUdVsexZzrHe6KZ8nM",
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
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth();
console.log(import.meta.env.REACT_APP_API_KEY);

export { app, db, storage, auth };
