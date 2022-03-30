import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBfkgNgag7YtQEfZ6ePaY5anSfAMthAEWg",
  authDomain: "thedojo-5d9af.firebaseapp.com",
  projectId: "thedojo-5d9af",
  storageBucket: "thedojo-5d9af.appspot.com",
  messagingSenderId: "384285105434",
  appId: "1:384285105434:web:0a8c2290a3ece0d38020a3",
};

//initializing firebase

firebase.initializeApp(firebaseConfig);

//initializing firestore
const projectFirestore = firebase.firestore();

//initializng auth
const projectAuth = firebase.auth();

//initailizing storage
const projectStorage = firebase.storage();

//timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };
