// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

// ...

import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

// ...
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYmhxfwKMVOckU22SqLEvsVzFUT7WSzRY",
  authDomain: "halifaxfoodie-group8.firebaseapp.com",
  projectId: "halifaxfoodie-group8",
  storageBucket: "halifaxfoodie-group8.appspot.com",
  messagingSenderId: "309496826813",
  appId: "1:309496826813:web:6d4b9d553ee273589320d4",
  measurementId: "G-4X911D3LZ2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

async function loginWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const { user } = await signInWithPopup(auth, provider);

    return { uid: user.uid, displayName: user.displayName };
  } catch (error) {
    if (error.code !== "auth/cancelled-popup-request") {
      console.error(error);
    }

    return null;
  }
}

async function sendMessage(roomId, user, text, sessionId) {
  try {
    await addDoc(collection(db, "chat-rooms", roomId, sessionId), {
      uid: user.uid,
      displayName: user.displayName,
      text: text.trim(),
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error(error);
  }
}

function getMessages(roomId, callback, user, sessionId) {
  console.log("Room Id in get messages: " + roomId);
  console.log("user.uid from get messages: " + user.uid);

  return onSnapshot(
    query(
      collection(db, "chat-rooms", roomId, sessionId),
      orderBy("timestamp", "asc")
    ),
    (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(messages);
    }
  );
}

let sessionId = "yiy";

function getSessions(roomId, callback) {
  console.log(
    "Query- getSessions" +
      query(collection(db, "chat-rooms"), orderBy("timestamp", "asc"))
  );
  return onSnapshot(
    query(collection(db, "chat-rooms"), orderBy("timestamp", "asc")),
    (querySnapshot) => {
      const sessions = querySnapshot.docs.map((doc) => ({
        id: doc.id,
      }));
      console.log("List of collections: " + sessions);
      callback(sessions);
    }
  );
}

export { loginWithGoogle, sendMessage, getMessages, getSessions };
