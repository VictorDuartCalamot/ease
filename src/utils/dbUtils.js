import { Alert} from 'react-native';
import {useState} from 'react';
import { isPasswordValid, EmailExists } from './validationUtils'; // Adjust the path as needed
//Firebase
import { firebase,database } from '../../firebase/firebaseConfig';
import { collection, addDoc, setDoc, doc,getDocs,getDoc,query, where, Query, CollectionReference, QuerySnapshot, updateDoc } from "firebase/firestore";
import { sendEmailVerification,getAuth,sendPasswordResetEmail } from 'firebase/auth';
import { deleteUser } from 'firebase/auth';
//const { initializeApp } = require('firebase-admin/app');
//const admin = initializeApp();
  
const db = firebase.firestore();
//Device Info
import * as Device from 'expo-device';

//Function to register a user
export async function registerUser(nif,companyName,username, surname, email, password,isBusinessAccount) {  
  
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
    //const emailDocRef = doc(database, "email", email);
    //const emailDocSnap = await getDoc(emailDocRef);
    //const blockedFieldRef = emailDocSnap.get("blocked");    

    // Create the json
    const userData = {      
      username: username,
      surname: surname,
      email: email,
      role: roleName,
      signUpDate: new Date(),
      //blocked: blockedFieldRef,
      isBusinessAccount: isBusinessAccount,
      isPremiumAccount: false,

    };
    //Add field to the json in case its a business account
    if (isBusinessAccount) {      
      userData.companyName = companyName;
      userData.role = {roleName};
    }
    if (isBusinessAccount) {
      //First create the company name document like if it was a user
      try{
        const companyDocRef = await setDoc(doc(database, "company", companyName),{
          companyName: companyName,
          signUpDate: new Date(),          
          nif: nif,
        });                 
      }catch(e){
        console.error(e);
      }       
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
  try {
    // Query to get the document that has the specific email in the users collection
    const q = query(collection(db, 'user'), where('email', '==', email));
    
    // Execute the query using the function getDocs
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length > 0) {
      const userDoc = querySnapshot.docs[0];
      const userDocId = userDoc.id;
      
      //console.log('User document ID:', userDocId);
      return userDocId;
    } else {
      console.error('No matching user document found for email:', email);
      return null;
    }

  } catch (error) {
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
    console.log(errorMessage +" - "+ errorCode);
    // ..
  });

}

//This function deletes both user from user collection and email document from email collection
async function deleteUserByEmail(email) {
  try {
    // Delete user document in the 'user' collection
    const userDocRef = doc(database, "user", email);
    await deleteDoc(userDocRef);

    // Delete user document in the 'email' collection
    const emailDocRef = doc(database, "email", email);
    await deleteDoc(emailDocRef);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}
async function deleteLoginHistoryByEmail(email) {
  try {
    // Query loginHistory documents with the given email
    const loginHistoryCollectionRef = collection(database, "loginHistory");
    const querySnapshot = await getDocs(
      query(loginHistoryCollectionRef, where("email", "==", email))
    );

    // Delete each loginHistory document
    const deletePromises = [];
    querySnapshot.forEach((doc) => {
      const docRef = doc.ref;
      deletePromises.push(deleteDoc(docRef));
    });

    // Wait for all delete operations to complete
    await Promise.all(deletePromises);
  } catch (error) {
    console.error("Error deleting login history:", error);
  }
}
//Function to check and return the current user role
async function getUserRoleName(userId) {
  let userRoleName;
  try {
    // Get the user document by the uuid of the user
    const userDocRef = doc(database, 'user', userId);
    const userDocSnapshot = await getDoc(userDocRef);    
    if (!userDocSnapshot.exists()) {
      console.log('User document not found.');
      return null;
    }  
    // Get the role name from the user document
    userRoleName = userDocSnapshot.data()?.role;     
    // Check if userRoleName is undefined or not a string
    if (typeof userRoleName !== 'string') {
      console.error('Invalid user role:', userRoleName);
      return null;
    }  
    //console.log('User role:', userRoleName);
  } catch (error) {
    console.error('Error getting user role:', error);
  }

    try {
    // Get the specified role document in the 'role' collection
    const roleDocRef = doc(database, 'role', userRoleName);
    const roleDocSnapshot = await getDoc(roleDocRef);

    if (!roleDocSnapshot.exists()) {
      console.log('Role document not found.');
      return null;
    }

    // Get the roleName field from the role document
    const roleName = roleDocSnapshot.data().roleName;

    //console.log('Role name:', roleName);

    // Compare the roleName fields
    if (userRoleName === roleName) {
      //console.log('User has the correct role.');
      return roleName;
    } else {
      console.log('User has an incorrect role.');
      return null;
    }
  } catch (error) {
    console.error('Error checking user role:', error);
    return null;
  }
}

export async function isAdmin(email){
  let userRole,adminRoleName
  try {
    userRole = await getUserRoleName(await getUserDocIdWithEmail(email));
  } catch (error) {
    console.error("RoleNotFound" + error);
  }
  try {
    const adminDocRef = doc(database, "role", "admin");
    const adminDocSnapshot = await getDoc(adminDocRef);

    if (adminDocSnapshot.exists()) {
      adminRoleName = adminDocSnapshot.data().roleName;
    }
  } catch (error) {
    console.error("Document Admin not found" + error);
  }

  if(userRole === adminRoleName){
    return true;
  }else{
    return false;
  }

}
export async function isSuperAdmin(email) {
  let userRole,adminRoleName
  try {
    userRole = await getUserRoleName(await getUserDocIdWithEmail(email));
  } catch (error) {
    console.error("RoleNotFound" + error);
  }
  try {
    const adminDocRef = doc(database, "role", "superadmin");
    const adminDocSnapshot = await getDoc(adminDocRef);

    if (adminDocSnapshot.exists()) {
      adminRoleName = adminDocSnapshot.data().roleName;
    }
  } catch (error) {
    console.error("Document superAdmin not found" + error);
  }

  if(userRole === adminRoleName){
    return true;
  }else{
    return false;
  }

}
//Function to delete a user
export async function deleteAllFromUser(email, userId) {
  const user = getAuth();
  // Checks if the user is admin or superAdmin
  if (await isAdmin(user.email) || await isSuperAdmin(user.email)) {
    try {
      // Show a confirmation dialog
      Alert.alert(
        'Confirm Deletion',
        'Are you sure you want to delete the user?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: async () => {
              // User confirmed, proceed with deletion
              try {
                // Deletes the user document from the user collection and the email document of the email collection.
                await deleteUserByEmail(email);
              } catch (error) {
                console.error("Error deleting user: " + error.message);
              }

              try {
                // Deletes all loginHistory of the user.
                await deleteLoginHistoryByEmail(email);
              } catch (error) {
                console.error("Error deleting user's login history: " + error.message);
              }

              try {
                const auth = getAuth();
                const uidToDelete = userId;
                // Delete user account
                await deleteUser(auth, uidToDelete);
                console.log('User successfully deleted');
              } catch (error) {
                console.error("Error deleting user account: " + error.message);
              }

              // Make sure both functions finish successfully
              await Promise.all([
                deleteUserByEmail(email),
                deleteLoginHistoryByEmail(email),
                deleteUser(auth, uidToDelete), // Include deleteUser function in Promise.all
              ]);
            },
          },
        ],
        { cancelable: true }
      );
    } catch (error) {
      console.error("Error showing confirmation dialog: " + error.message);
    }
  } else {
    console.log("User has not enough permissions to proceed with this operation");
  }
}

