import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBres0iOOWbVVWnxUmTGt_bSIIg2WW40JI",
  authDomain: "schway-fb7f6.firebaseapp.com",
  databaseURL: "https://schway-fb7f6.firebaseio.com",
  projectId: "schway-fb7f6",
  storageBucket: "schway-fb7f6.appspot.com",
  messagingSenderId: "36261839198",
  appId: "1:36261839198:web:a2c17660b45aad81",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
