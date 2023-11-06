import { Alert } from 'react-native';
import { firebase,database } from '../../firebase/firebaseConfig';
import { isPasswordValid, isEmailAlreadyRegistered } from './validationUtils'; // Adjust the path as needed
import { collection, addDoc } from "firebase/firestore";
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
    
/*
    //Set custom claims for the user role
    await firebase.admin.auth().setCustomUserClaims(user.uid, {role: 'user'});

    // Send email verification
    await firebase.auth().currentUser.sendEmailVerification({
      handleCodeInApp: true,
      url: 'ease-8d84a.firebaseapp.com', // Update with your verification URL
    });

    Alert.alert('Verification email sent'); 
    */ 
    const userData = {
      username: username,
      surname: surname,
      email: email,
      role:'user',
      SignUpDate: new Date(),
    };
    const docRef = await addDoc(collection(database, "users"), userData);

    // Registration successful
  } catch (error) {
    Alert.alert('Registration Error', error.message);
  }

    /*
    usersCollection.add(userData)
    .then((docRef) => {
      console.log('User document added with ID: ', docRef.id);
    })
    .catch((error) => {
      console.error('Error adding user document: ', error);
    });*/
/*
    // Store user data in Firestore
    await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
      username,
      surname,
      email,
      role:'user',
      SignUpDate: new Date().toLocaleString(),
    });*/

    // Registration successful
  /*} catch (error) {
    Alert.alert('Registration Error', error.message);
  }*/
}
