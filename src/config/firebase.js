// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYsWDPkgJvToHrurQwMJZh7ISpQpo0lPE",
  authDomain: "vproj-ed4de.firebaseapp.com",
  projectId: "vproj-ed4de",
  storageBucket: "vproj-ed4de.appspot.com",
  messagingSenderId: "201560171077",
  appId: "1:201560171077:web:3212a6cb809f2a7831f92c",
  measurementId: "G-3LYGM7KZVS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);