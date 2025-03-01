// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { getDatabase, ref, set, push, onValue, update } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-056mqQ29o9MlixOgyj-009vI25CGUPM",
  authDomain: "dijikshetra.firebaseapp.com",
  projectId: "dijikshetra",
  storageBucket: "dijikshetra.firebasestorage.app",
  messagingSenderId: "221010815390",
  appId: "1:221010815390:web:bb1b624588778c53a38e8f",
  measurementId: "G-949DT4PEL1",
};

// Initialize Firebase



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { db,  auth, ref, set, push, onValue, update };
const analytics = getAnalytics(app);