import { Alert} from 'react-native';
import {useState} from 'react';
import { isPasswordValid, EmailExists } from './validationUtils'; // Adjust the path as needed
//Firebase
import { firebase,database } from '../../firebase/firebaseConfig';
import { collection, addDoc, setDoc, doc,getDocs,getDoc,query, where, Query, CollectionReference, QuerySnapshot, updateDoc } from "firebase/firestore";
import { sendEmailVerification,getAuth,sendPasswordResetEmail } from 'firebase/auth';
const db = firebase.firestore();
//Device Info
import * as Device from 'expo-device';

//Function to register a user
export async function registerUser(nif,username, surname, email, password,isBusinessAccount) {  
  try {    
    //Create user in firebase authentication
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    //Create a document with the email as documentId and with the blocked field in it as false by default
    try{
      const emailDocRef = doc(database, "email", email);
      await setDoc(emailDocRef, { blocked: false });
      
    }catch(e){
      console.error(e);
    }

    //Depending on account type the user will be given a role or other
    if (isBusinessAccount) {
      const businessRoleDocRef = doc(database, "business_role", "accountManager");
      const businessRoleDocSnap = await getDoc(businessRoleDocRef);
      roleName = businessRoleDocSnap.get("roleName");
    } else {
      const roleDocRef = doc(database, "role", "user");
      const roleDocSnap = await getDoc(roleDocRef);
      roleName = roleDocSnap.get("roleName");
    }
    //Blocked reference field
    const emailDocRef = doc(database, "email", email);
    const emailDocSnap = await getDoc(emailDocRef);
    const blockedFieldRef = emailDocSnap.get("blocked")    

    // Create the json
    const userData = {      
      username: username,
      surname: surname,
      email: email,
      role: roleName,
      signUpDate: new Date(),
      blocked: blockedFieldRef,
      isBusinessAccount: isBusinessAccount,
      isPremiumAccount: false,

    };
    //Add field to the json in case its a business account
    if (isBusinessAccount) {
      userData.nif = nif;
    }
    //Add document in firestore with the document ID as the user ID in the user collection
    try{
      const docRef = await setDoc(doc(database, "user", user.uid),userData);         
    }catch(e){
      console.error(e);
    }         
    
    /*const auth = getAuth();
    sendEmailVerification(auth.currentUser).then(() => {
    // Email verification sent!
    // ...
    Alert.alert('Email verification sent');
    });
    */    
  } catch (error) {
    Alert.alert('Registration Error', error.message);
  }
}
//Function to gather the user authentication ID using the email. Needs to be authenticated to user this function
export async function getUserDocIdWithEmail(email) {
  try{
    //Query to get the document that has the specific email in the users collection
  const q = query(collection(db, "user"), where("email", "==", email));
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
//Function to check if the account is blocked (returns boolean)
export async function isAccBlocked(email) {
  try {
    const docRef = doc(db, 'email', email);

    const documentSnapshot = await getDoc(docRef);

    // Check if the document exists
    if (documentSnapshot.exists()) {
      // Access the specific field
      const fieldValue = documentSnapshot.data().blocked;

      // Do something with the field value
      //console.log(`Value of field 'blocked':`, fieldValue);
      //console.log(fieldValue);
      return fieldValue;
    } else {
      console.log('Document does not exist');
      return null; // or handle the case where the document doesn't exist
    }
  } catch (error) {
    console.error("Error retrieving email data:", error);
    return null;
  }
}
//Function to block or unblock a user
export async function BlockUnblockUser(email, block) {
  //It changes the blocked field to true or false depending block parameter
  try {
    const userDocRef = doc(database, 'email', email);
    await updateDoc(userDocRef, { blocked: block });
  } catch (error) {
    console.error('Error updating user account status:', error);
  }
}
//Function to generate a LogginRegister in the log in history
export async function LoginHistoryRegistry(email, isLoggedIn,reasonMsg) {
  //constant for todays date
  const logginDate = new Date();

  //json of log in information
  const logginInfo = ({
    email: email,
    successfulLogin: isLoggedIn,
    loginDate: logginDate,
    deviceType: Device.deviceType,
    deviceManufacturer: Device.manufacturer,
    deviceOS: Device.osName,
    isRealDevice: Device.isDevice,    
  });
  
  //If the user login is incorrect we add the reason
  if (!isLoggedIn) {
    logginInfo.reason = reasonMsg;
  }
  //Create document with with the logginInfo fields in it 
  try {
    await addDoc(collection(database, 'loginHistory'), logginInfo);
  } catch (error) {
    console.error('Error logging login history:', error);
  }
}

//Function to modify username and surname of fields from a user
export async function modifyUser(userID, newUsername,newSurname) {
  //const db = firebase.firestore();  
  if (userID){
    try{
      const docRef = doc(db,'user',userID)
      if (username){
        await updateDoc(docRef,{
          username: newUsername,
        })
      }
      if (surname){
        await updateDoc(docRef,{
          surname: newSurname,
        })
      }
      
    }catch(error){
      console.error(error);
    }
  }else{
    console.log(`Document ID: ${userID} doesn't exist.`)
  }
}

//Function to reset password via mail
export async function ResetPassword(email){
  const auth = getAuth();
  sendPasswordResetEmail(auth, email).then(() => {
    // Password reset email sent!
    // ..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

}
//Function to check user role
export async function CheckUserRole(userID){
  try{
    const docRef = doc(db,'user',userID);
  }catch(error){}
}

//Function to delete a user
export async function DeleteUser(userID) {


}