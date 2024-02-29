import 'firebase/functions';
import {doc,getDoc } from "firebase/firestore";
import { firebase } from '../../functions/firebaseConfig';
const db = firebase.firestore();
//Check if the password contains the minimum requirements
export function isPasswordValid(password) {
  const hasNumber = /\d/;
  const hasUppercase = /[A-Z]/;
  const hasLowercase = /[a-z]/;
  const hasSymbol = /[$;._\-*]/;
  const longEnough = /^.{8,}$/;


  return (
    hasNumber.test(password) &&
    hasUppercase.test(password) &&
    hasLowercase.test(password) &&
    hasSymbol.test(password) &&
    longEnough.test(password)
  );
}

//Checks if the email is already registered in the firebase database
export async function EmailExists(email) {
const emailDocRef = doc(db, "email", email);
const docSnapshot = await getDoc(emailDocRef);

if (docSnapshot.exists()) {  
  return true;
} else {
  return false;
}
  
}
//Funcion to check if the email follows a certain pattern
export function isValidEmail(email) {
  // Use a regular expression to check if the email format is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
//Function to check if the NIF contains exactly 9 digits
export function isValidNIF(nif){
  const nifRegex = /^[0-9]{9}$/;
  return nifRegex.test(nif);
};
