// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBedVNL8IJBZms2mIa4dlTNpaErpvOqlAg",
  authDomain: "ease-8d84a.firebaseapp.com",
  projectId: "ease-8d84a",
  storageBucket: "ease-8d84a.appspot.com",
  messagingSenderId: "157901651065",
  appId: "1:157901651065:web:77df0245d5791bbb75e8a8",
  measurementId: "G-WXGBF36HH0"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export default firebaseApp