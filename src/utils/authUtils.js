import { Alert } from 'react-native';

import { isPasswordValid, isEmailAlreadyRegistered } from './validationUtils'; // Adjust the path as needed

//Firebase
import { firebase,database } from '../../firebase/firebaseConfig';
import { collection, addDoc, setDoc, doc,getDocs,getDoc,query, where, Query, CollectionReference } from "firebase/firestore";

//Device Info
import * as Device from 'expo-device';

//import admin from 'firebase-admin';
export async function registerUser(username, surname, email, password, confirmPassword) {
  if (!isPasswordValid(password)) {
    Alert.alert('Invalid Password', 'The password must contain 1 Uppercase letter, .');
    return;
  }

  if (password !== confirmPassword) {
    Alert.alert('Passwords Do Not Match', 'Please make sure your passwords match.');
    return;
  }

  if (await isEmailAlreadyRegistered(email)) {
    Alert.alert('Email Already Registered', 'Please use a different email address.');
    return;
  }

  try {
    
    //Create user in firebase authentication
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    

    //Set custom claims for the user role
    /*
    await firebase.admin.auth().setCustomUserClaims(user.uid, {role: 'user'});

    // Send email verification
    await firebase.auth().currentUser.sendEmailVerification({
      handleCodeInApp: true,
      url: 'ease-8d84a.firebaseapp.com', // Update with your verification URL
    });

    database.collection('roles').doc('user').get();
    Alert.alert('Verification email sent'); */
    

    const docRef2 = doc(database, "roles", "User");
    const docSnap = await getDoc(docRef2);
    const userRole = await docSnap.get('Role');
    
    if (docSnap.exists()) {   
      const userData = {      
        username: username,
        surname: surname,
        email: email,
        role: userRole,
        SignUpDate: new Date(),
        Blocked: false,
      };
  
      //Add document in firestore with the document ID as the user ID
      const docRef = await setDoc(doc(database, "users", user.uid),userData);

    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }


   

    // Registration successful
  } catch (error) {
    Alert.alert('Registration Error', error.message);
  }

}

/*export async function getUserDocIdWithEmail(email) {
  const q = query(collection(database, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
  console.log(doc.id);
  return doc.id;
});};*/

export async function getUserDocIdWithEmail(email) {
  const q = query(collection(database, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);

  const docIds = [];

  querySnapshot.forEach((doc) => {
    docIds.push(doc.id);
  });

  if (docIds.length > 0) {
    console.log(docIds[0]);
    return docIds[0];
  } else {
    // Handle the case where no matching document is found
    console.error('No matching user document found for email:', email);
    return null; // or throw an error or handle it in your application logic
  }
}

export async function shouldBlockUser(email){ 
  const userID = getUserDocIdWithEmail(email);

}

export async function LoginHistoryRegistry(email, isLoggedIn) {
  const db = firebase.firestore();
  const logginDate = new Date();
  const logginInfo = {
    successfulLogin: isLoggedIn,
    loginDate: logginDate,
    deviceType: Device.deviceType,
    deviceManufacturer: Device.manufacturer,
    deviceOS: Device.osName,
    isRealDevice: Device.isDevice,
  };

  try {
    const userDocId = await getUserDocIdWithEmail(email);

    if (userDocId) {
      const userRef = db.collection('users').doc(userDocId);
      const logginHistoryCollectionRef = userRef.collection('logginHistory');

      // Convert the date to a string
      const dateString = logginDate.toISOString();

      // Add a new document to the 'logginHistory' sub-collection
      await logginHistoryCollectionRef.doc(dateString).set(logginInfo);

      console.log('Created new login registry');
    } else {
      console.log('No matching user document found for email:', email);
    }
  } catch (error) {
    console.log('Failed to create a new login registry');
    console.error(error);
  }

  //db.collection('users/'+ getUserDocIdWithEmail(email)).doc('login_History').set({})
}