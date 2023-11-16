import { Alert} from 'react-native';
import {useState} from 'react';
import { isPasswordValid, isEmailAlreadyRegistered } from './validationUtils'; // Adjust the path as needed

//Firebase
import { firebase,database } from '../../firebase/firebaseConfig';
import { collection, addDoc, setDoc, doc,getDocs,getDoc,query, where, Query, CollectionReference, QuerySnapshot, updateDoc } from "firebase/firestore";

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


//Function to gather the user authentication ID using the email
export async function getUserDocIdWithEmail(email) {
  const db = firebase.firestore();
  try{
    //Query to get the document that has the specific email in the users collection
  const q = query(collection(db, "users"), where("email", "==", email));
  //execute the query using the function get docs
  const querySnapshot = await getDocs(q);
  
  if (!QuerySnapshot.empty){
    const userDoc = querySnapshot.docs[0];
    const userDocId = userDoc.id;    
    //const documentIdField = userDoc.get('Document ID');
    return userDocId;
  }else{
    console.error('No matching user document found for email:', email);
  }
  }catch(error){
    console.error('Error fetching user document ID:', error);
    return null;

  }
}

export async function isAccBlocked(email){
  const db = firebase.firestore();
  try{
    const userDocId = await getUserDocIdWithEmail(email);
  
  const docRef = doc(db,'users',userDocId);

  const documentSnapshot = await getDoc(docRef);
  // Check if the document exists
  if (documentSnapshot.exists()) {
    // Access the specific field
    const fieldValue = documentSnapshot.get('Blocked');

    // Do something with the field value
    console.log(`Value of field '${"Blocked"}':`, fieldValue);
    return fieldValue;
  } else {
    console.log('Document does not exist');
    return null; // or handle the case where the document doesn't exist
  }
  }catch(error){
    console.error("Email doesn't exist:", email)
    return null;
  }
  
}

export async function BlockUnblockUser(email, value){ 
  const db = firebase.firestore();
  const userID = await getUserDocIdWithEmail(email);
  try{
    const docRef = doc(db,'users',userID)
    await updateDoc(docRef,{
      Blocked: value,
    });
    console.log(`User updated. Field Blocked: '${value}'`);
  }
  catch(error){

  }

}

export async function LoginHistoryRegistry(email, isLoggedIn,message) {
  //create a reference for the firestore
  const db = firebase.firestore();
  //constant for todays date
  const logginDate = new Date();

  //json of log in information
  const logginInfo = ({
    successfulLogin: isLoggedIn,
    loginDate: logginDate,
    deviceType: Device.deviceType,
    deviceManufacturer: Device.manufacturer,
    deviceOS: Device.osName,
    isRealDevice: Device.isDevice,    
  });
  
  //If the user login is incorrect we add the reason message
  if (!isLoggedIn) {
    logginInfo.reason = message;
  }
  
  try {
    //retrieve the userID using the email (returs data or null)
    const userDocId = await getUserDocIdWithEmail(email);
    //if returns data
    if (userDocId) {
      //reference to the document id of the user inside users collection
      const userRef = db.collection('users').doc(userDocId);
      //reference of the logginHistory collection using the userRef
      const logginHistoryCollectionRef = userRef.collection('logginHistory');

      // Convert the date to a string
      const dateString = logginDate.toISOString();

      // Add a new document to the 'logginHistory' sub-collection with current date as documentID 
      await logginHistoryCollectionRef.doc(dateString).set(logginInfo);

      console.log('Created new login registry');
    } else {
      console.log('No matching user document found for email:', email);
    }
  } catch (error) {
    console.log('Failed to create a new login registry');
    console.error(error);
  }  
}