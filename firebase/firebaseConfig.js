import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBedVNL8IJBZms2mIa4dlTNpaErpvOqlAg",
  authDomain: "ease-8d84a.firebaseapp.com",
  projectId: "ease-8d84a",
  storageBucket: "ease-8d84a.appspot.com",
  messagingSenderId: "157901651065",
  appId: "1:157901651065:web:77df0245d5791bbb75e8a8",
  measurementId: "G-WXGBF36HH0"
};

if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}
export {firebase};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);

/*import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from 'firebase/compat/app';
import { getFirestore } from "firebase/firestore";
//import 'firebase/compat/auth';
//import 'firebase/compat/firestore';
import Constants from "expo-constants";

const firebaseConfig = {
  apiKey: Constants.extra.apiKey,
  authDomain: Constants.extra.authDomain,
  projectId: Constants.extra.projectId,
  storageBucket: Constantsextra.storageBucket,
  messagingSenderId: Constants.extra.messagingSenderId,
  appId: Constants.extra.appId,
  databaseURL: Constants.extra.databaseURL,
};

if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}
export {firebase};

export const database = getFirestore();
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);*/