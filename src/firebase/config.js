// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBt671R9hPmJODzlRyR-BxBdD843kSmS6g",
  authDomain: "miniblog-ccc24.firebaseapp.com",
  projectId: "miniblog-ccc24",
  storageBucket: "miniblog-ccc24.appspot.com",
  messagingSenderId: "920663145791",
  appId: "1:920663145791:web:2be96267866e3e84d3678a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db  = getFirestore(app)

export { db }