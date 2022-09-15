// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCe28nDQGPYgyoCSeTwa_Y0oZtyNRu3LJ8",
  authDomain: "karki-app.firebaseapp.com",
  projectId: "karki-app",
  storageBucket: "karki-app.appspot.com",
  messagingSenderId: "34560395578",
  appId: "1:34560395578:web:66d0c0cd62a273ae2c6803",
  measurementId: "G-V5KPHZEXKR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const storage = getStorage(app)