import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLK0zyC-5JOYhFEPNy0MFjyBiSfMcIiw4",
  authDomain: "resto-auth-6589e.firebaseapp.com",
  projectId: "resto-auth-6589e",
  storageBucket: "resto-auth-6589e.appspot.com",
  messagingSenderId: "281585313003",
  appId: "1:281585313003:web:7010dba960df37a252caae",
  measurementId: "G-17DMKPDR0S",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;
