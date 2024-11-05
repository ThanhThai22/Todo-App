// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmNxY6SOLJuLApaiKF3SclkplkSUEgnss",
  authDomain: "todoapp-dc479.firebaseapp.com",
  projectId: "todoapp-dc479",
  storageBucket: "todoapp-dc479.firebasestorage.app",
  messagingSenderId: "964253060706",
  appId: "1:964253060706:web:8eb3b50086b57214b0cb3b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);