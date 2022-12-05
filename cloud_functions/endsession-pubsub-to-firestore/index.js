const Firestore = require('@google-cloud/firestore');
const PROJECTID = 'halifaxfoodie-group8';
const COLLECTION_NAME = 'chat-rooms';

// Function to store the details from pubsub to firebase
const firestore = new Firestore({
  "type": "service_account",
  "project_id": "halifaxfoodie-group8",
  "private_key_id": "9002b1981bf4a31e4b12ed7f437b9edb8819a107",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDWxFV7CD5ztRjU\nKq2R7OzE4kY26fgz4cgfYeKRCYz6gOMxK6arp6mSqsia3LRteFZ6bsId0sfP8+rB\n0PS76i7rLkf/E7NugvxM1RZIoK9+NlXetG/c3fH6MkS2h7HST7T8VpEMGnKqqv3R\nZy3qPPOH11iSJ0SdbR7r6Bi2MoST1FCJaUMpLygslKqKMYES/nwEiQfluszAiy0A\ndsoxQOE3m4DEUv9IgNCE69Tc/duaT6yNnWx5C6avANRLtbwGsmhhqXtlAE4pSrhq\n75rCF4U8gXMI6V5KHBGEFBUvrdGgbudOYWVh9KxnNxJPocW1OZeJ92oRAGGFf9Ij\nsbcGbkE/AgMBAAECggEASg5YZXzRwCddwOdYg52dhUR7LrteBVHhJoUj0Zxn+wdP\nkCh7p+xACl2On+vj4W2h8ETZ9du1X809kYiio1ucwybp15itAjnzkvDVZsTVzuEg\nmhNBEXmM05fa3tAKrrkicPLOwEwsZxJgRIFeMUvEM/67QWZ+AATdKT6Wqtjfo3Nr\n9FN8fpPPnOuiMz99Z5e80LiudSz2IuZYYRcbE5cwI3thqBD//v2M6ap8PZqJgyoV\nmoty7xwh8iOodyp/EKXckMJJfjDWYU+PleI5+TVZWEE/MxdOqDurAqUMFlkRq2+k\nFL+po905SuZK5ageYP5E8Zx1QEealCyfOv1wJ4dTpQKBgQD+cLbssrHie32P0Fhw\nFkFMWZVjTZw36K49HhVzvf9in5P10fJaD7lxfSp+AKGDyUejsyEh1rNj14vI7Fst\npR6u+o8KAfjYMGsrkGGp2p/fcY1PQd3t3Su03EfNYx8qyPC8sAVPYtFpqNpEbawk\nBZOJ7S5LN7d5/Cb8DJ7Kb3MrYwKBgQDYFVx0hAu0fAVETT+ESNtthprz2n4Bq0Oh\nKlwUW/7+1pyev8F47EvIJF8S8oKEiEIN9JFsrLh7aViXrgF5cHroTNFidN96KXL8\n2ysWVU62bsZysnj9wWpI0PbFFZUl8xoNrpcZ8ypWzHttNtMNSR8IgqzenA690TvA\nk56n3K7vdQKBgGkri+Dgp/h2lNrqAnQqLslxSfdm8AiIC+VFVxalVTedwFnecu9Z\nCozncLXuatR/UTZP54UGKtY9FRFy6OlAFCO9e3xmfkZWFSZHoqbDsEt6sy8siaA1\nSEiUuLUjoJFdx2wm0bsTnH2xBq88Keglyes792Ot3w/z8uVCDiyczp0DAoGADKT7\nWwobET2spTmL/PayeG9HA/wGIZzfAUBUURCtFEaEtbls3eGd8aFHOvmb75t1mhF0\nrRJSXU5l08Jn7a5KUuuj2QoTxbdFNkyw8caeK4jB7hZJhDfcO1SXDCNeLfFS1fgg\neXFESf3/Pv3VTdK4kSvsZ75kEnF6+KLqxtHgHr0CgYEA6/wgQ+kJx8OdFsZ1aE+X\n+u5VhBUpjWeioD24bsr7Gs8HAdJL7DI9olr2d+XGHpTF524AFD/EZrgAtw2qw0tf\n7/ZlfAwsDIa0xxKDWuiiD5oRDJtBeXcVgWmribiBeR2Odq6JCGEUap4qX00beZk/\nuSMVp62AXgF2gGVGXcFlfD8=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xeoc0@halifaxfoodie-group8.iam.gserviceaccount.com",
  "client_id": "108582859945449275287",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xeoc0%40halifaxfoodie-group8.iam.gserviceaccount.com"
});
exports.helloPubSub = (event, context) => {
  const message = event.data
    ? Buffer.from(event.data, 'base64').toString()
    : 'Event Data is empty';

  console.log("message: " + message);
  var str = message.replace(/'/g, '"')
  console.log("str: " + str);
  let json_message = JSON.parse(message);
  console.log(json_message.orderId);
  console.log(json_message.restaurantId);
  // const firebaseConfig = {
  // apiKey: "AIzaSyDYmhxfwKMVOckU22SqLEvsVzFUT7WSzRY",
  // authDomain: "halifaxfoodie-group8.firebaseapp.com",
  // projectId: "halifaxfoodie-group8",
  // storageBucket: "halifaxfoodie-group8.appspot.com",
  // messagingSenderId: "309496826813",
  // appId: "1:309496826813:web:6d4b9d553ee273589320d4",
  // measurementId: "G-4X911D3LZ2",
  // };
  
  // const app = initializeApp(firebaseConfig);
  // const db = getFirestore(app);
  // addDoc(collection(db, "chat-rooms", "test-room", "test-session"), {
  //     uid: "hhh",
  //     displayName: "Jj",
  //     text: "kk",
  //     timestamp: "jj",
  //   });
  const orderId = json_message.orderId;
  const restaurantId = json_message.restaurantId;
  const sessionId = json_message.sessionId;
  const userId = json_message.userId;
  const displayName = json_message.displayName;
  const created = new Date().toUTCString();
  firestore.collection(COLLECTION_NAME).doc("delivery").collection(sessionId).doc().set({
    orderId : orderId,
    restaurantId : restaurantId,
    displayName : displayName,
    text: "You chat has been initiated",
    timestamp: created,
    uid: userId
    }).then(doc => {
      console.info('stored new doc id#', doc.id);
    }).catch(err => {
      console.error(err);
    });
  const sessionStatusCollecttion = 'sessionStatus';
  // const sessionStatus = "active";
  firestore.collection(sessionStatusCollecttion).doc(sessionId).set({
    sessionStatus: "active"
    }).then(doc => {
      console.info('stored new doc id#', doc.id);
    }).catch(err => {
      console.error(err);
    });
  console.log("The details were added to the firebase successfully");
};
