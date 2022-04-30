// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0yp_EpVoOe7pCkW3YiBnke4yPQS6rCNQ",
  authDomain: "crud-7a2cb.firebaseapp.com",
  projectId: "crud-7a2cb",
  storageBucket: "crud-7a2cb.appspot.com",
  messagingSenderId: "945206845017",
  appId: "1:945206845017:web:fff1ac79907832218fdb48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export default db