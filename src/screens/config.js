
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import { initializeApp } from 'firebase/app';


const firebaseConfig = {
    apiKey: "AIzaSyBedVNL8IJBZms2mIa4dlTNpaErpvOqlAg",
    authDomain: "ease-8d84a.firebaseapp.com",
    databaseURL: "https://ease-8d84a-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ease-8d84a",
    storageBucket: "ease-8d84a.appspot.com",
    messagingSenderId: "157901651065",
    appId: "1:157901651065:web:77df0245d5791bbb75e8a8",
    measurementId: "G-WXGBF36HH0"
};

if (!firebase.app.length){
    firebase.initializeApp(firebaseConfig)
}

export { firebase };