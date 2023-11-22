import { Alert} from 'react-native';
import {useState} from 'react';
import { isPasswordValid, EmailExists } from './validationUtils'; // Adjust the path as needed
//Firebase
import { firebase,database } from '../../firebase/firebaseConfig';
import { collection, addDoc, setDoc, doc,getDocs,getDoc,query, where, Query, CollectionReference, QuerySnapshot, updateDoc } from "firebase/firestore";

const db = firebase.firestore();
//Device Info
import * as Device from 'expo-device';

//Function to register a user
export async function registerUser(nif,username, surname, email, password,isBusinessAccount) {  
  try {    
    //Create user in firebase authentication
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    //Depending on account type the user will be given a role or other
    if (isBusinessAccount){
      roleDocRef = doc(database, "business_role", "accountManager");
    }else{
      roleDocRef = doc(database, "role", "user");
    }
    //Retrieve the role
    const docSnap = await getDoc(roleDocRef);
    const userRole = docSnap.ref; 
      const userData = {      
        username: username,
        surname: surname,
        email: email,
        role: userRole,
        signUpDate: new Date(),
        blocked: false,
        isBusinessAccount: isBusinessAccount,
        isPremiumAccount: false,

      };
      if (isBusinessAccount) {
        userData.nif = nif;
      }
      //Add document in firestore with the document ID as the user ID
      try{
        const docRef = await setDoc(doc(database, "user", user.uid),userData);
        const emailDocRef = await setDoc(doc(database, "email", email),{});  
      }catch(e){
        console.error(e);
      }

      
         
    // Registration successful
  } catch (error) {
    Alert.alert('Registration Error', error.message);
  }

}
//Function to gather the user authentication ID using the email
export async function getUserDocIdWithEmail(email) {
  //const db = firebase.firestore();
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

//Function to check if the account is blocked (returns boolean)
export async function isAccBlocked(email){
  //const db = firebase.firestore();
  try{
    const userDocId = await getUserDocIdWithEmail(email);
  
  const docRef = doc(db,'user',userDocId);

  const documentSnapshot = await getDoc(docRef);
  // Check if the document exists
  if (documentSnapshot.exists()) {
    // Access the specific field
    const fieldValue = documentSnapshot.get('blocked');

    // Do something with the field value
    console.log(`Value of field '${"blocked"}':`, fieldValue);
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
//Function to block or unblock a user
export async function BlockUnblockUser(email, isBlock){ 
  //const db = firebase.firestore();
  const userID = await getUserDocIdWithEmail(email);
  try{
    const docRef = doc(db,'user',userID)
    await updateDoc(docRef,{
      Blocked: isBlock,
    });
    console.log(`User updated. Field Blocked: '${isBlock}'`);
  }
  catch(error){

  }
}
//Function to generate a LogginRegister in the log in history
export async function LoginHistoryRegistry(email, isLoggedIn,reasonMsg) {
  //create a reference for the firestore
  //const db = firebase.firestore();
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
    logginInfo.reason = reasonMsg;
  }
  
  try {
    //retrieve the userID using the email (returs data or null)
    const userDocId = await getUserDocIdWithEmail(email);
    //if returns data
    if (userDocId) {
      //reference to the document id of the user inside users collection
      const userRef = db.collection('user').doc(userDocId);
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
export async function ResetPassword(userID){

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