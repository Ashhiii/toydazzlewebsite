// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBu7RkCtTADmy1pr50P_9QzonL7zwdCv8U",
  authDomain: "toy-dazzle-6786f.firebaseapp.com",
  projectId: "toy-dazzle-6786f",
  storageBucket: "toy-dazzle-6786f.appspot.com",
  messagingSenderId: "15426773303",
  appId: "1:15426773303:web:e8e54e079636d87684fab2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

export { auth, fireDB };
