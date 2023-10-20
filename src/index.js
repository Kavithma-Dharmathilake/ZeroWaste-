// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  forEach
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxdjJAbj7i6g0OvDLgWzHynFpjNAwL5z4",
  authDomain: "zero-waste-d8f97.firebaseapp.com",
  projectId: "zero-waste-d8f97",
  storageBucket: "zero-waste-d8f97.appspot.com",
  messagingSenderId: "692448835866",
  appId: "1:692448835866:web:1600f922db798f9b3cd4a3",
  measurementId: "G-FE21DB7ZMW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export {
  app,
  db,
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  forEach
};
