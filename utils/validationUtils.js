import { firebase } from '../../../firebase/firebaseConfig';

//Check if the password contains the minimum requirements
export function isPasswordValid(password) {
  const hasNumber = /\d/;
  const hasUppercase = /[A-Z]/;
  const hasLowercase = /[a-z]/;
  const hasSymbol = /[$;._\-*]/;

  return (
    hasNumber.test(password) &&
    hasUppercase.test(password) &&
    hasLowercase.test(password) &&
    hasSymbol.test(password)
  );
}


//Checks if the email is already registered in the firebase database
export async function isEmailAlreadyRegistered(email) {
  const snapshot = await firebase.firestore().collection('users').where('email', '==', email).get();
  return !snapshot.empty;
}

