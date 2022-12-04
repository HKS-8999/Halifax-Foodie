exports.helloPubSub = (event, context) => {
  const message = event.data
    ? Buffer.from(event.data, "base64").toString()
    : "Hello, World";

  console.log(message);
  var str = message.replace(/'/g, '"');
  let json_message = JSON.parse(str);
  console.log(json_message.orderId);
  console.log(json_message.restaurantId);
  const firebaseConfig = {
    apiKey: "AIzaSyDYmhxfwKMVOckU22SqLEvsVzFUT7WSzRY",
    authDomain: "halifaxfoodie-group8.firebaseapp.com",
    projectId: "halifaxfoodie-group8",
    storageBucket: "halifaxfoodie-group8.appspot.com",
    messagingSenderId: "309496826813",
    appId: "1:309496826813:web:6d4b9d553ee273589320d4",
    measurementId: "G-4X911D3LZ2",
  };
  var { initializeApp } = require("firebase/app");
  var { getFirestore } = require("firebase/firestore");
  var { collection } = require("firebase/firestore");
  var { addDoc } = require("firebase/firestore");
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  addDoc(collection(db, "chat-rooms", "test-room", "test-session"), {
    uid: "hhh",
    displayName: "Jj",
    text: "kk",
    timestamp: "jj",
  });
  console.log("The details were added to the firebase successfully");
};
