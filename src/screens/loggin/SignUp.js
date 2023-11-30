import { Text, StyleSheet, View, Image, TextInput, TouchableOpacity, Alert} from 'react-native';
import React, { useState } from 'react';
import { registerUser } from '../../utils/dbUtils'; // Update the path as needed
import { isPasswordValid,EmailExists,isValidEmail,isValidNIF,emailExists2} from '../../utils/validationUtils'; // Update the path as needed
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker'
import { getAuth, signOut } from "firebase/auth";

export default SignUP = (props) => {
  const [username, setUserName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUsernameBlank, setUserNameRequiredMessage] = useState('');
  const [isSurnameBlank, setSurnameRequiredMessage] = useState('');
  const [passwordRequirementsMessage, setPasswordRequirementsMessage] = useState('');
  const [emailAlreadyRegisteredMessage, setEmailAlreadyRegisteredMessage] = useState('');
  const [isNifBlank,setNifRequiredMessage] = useState('');
  const [validEmail,setValidEmail] = useState('');
  const [isValidPassword,setValidPassword]=useState('');
  const [selectedAccountType, setSelectedAccountType] = useState(false);
  const [nif, setNif] = useState('');
  
    //Function to validate all fields of the registration and if failed shows the error message at the bottom of the screen.
   async function validateRegistration() {
    const errors = {};
    //Checks account type (business account or not) and if the nif is valid
    if (selectedAccountType && !isValidNIF(nif)) {
        errors.nif = 'NIF is required for Business Account';
        setNifRequiredMessage('NIF is required for Business Account');      
    }
  
    if (!username) {
      errors.username = 'Username is required';
      setUserNameRequiredMessage('Username is required');
    }
  
    if (!surname) {
      errors.surname = 'Surname is required';
      setSurnameRequiredMessage('Surname is required');
    }
    //Checks if the email is not valid
    if (!isValidEmail(email)) {
      errors.email = 'Please enter a valid email address.';
      setValidEmail('Please enter a valid email address.');
    }else{ 
      //if its valid then checks if it exist
      if (await EmailExists(email)){
        errors.email = 'Email already exists.';
        setValidEmail('Email already exists.');
      }
    }
    
    //Checks if password is valid
    if (!isPasswordValid(password)) {
      const requirements = getUnmetPasswordRequirements(password);
      errors.password = `Password requirements: ${requirements.join(', ')}`;
      setPasswordRequirementsMessage(`Password requirements: ${requirements.join(', ')}`);
    }
    //Checks if the confirmPassword equals to the first password introduced 
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match. Please make sure your passwords match.';
      setValidPassword('Passwords do not match. Please make sure your passwords match.');
    }
    return errors;
  };
  //Function to handle the register 
  const handleRegister = async () => { 
    setValidEmail('');
    setNifRequiredMessage('');
    setUserNameRequiredMessage(''); // Reset the username required message
    setSurnameRequiredMessage('');
    setEmailAlreadyRegisteredMessage(''); // Reset the email already registered message
    setPasswordRequirementsMessage(''); // Reset the password requirements message
    setValidPassword('');
    
    const validationErrors = await validateRegistration();
    if (Object.keys(validationErrors).length > 0){
      console.log('Validation errors:', validationErrors);
    }else{
      try{
        await registerUser(nif,username,surname,email,password,selectedAccountType);                
        const auth = getAuth();
        signOut(auth).then(() => {
        }).catch((error) => {
          console.error(error);      
        });
      } catch (error) {
        Alert.alert('Registration Error', error.message);
      }
    }      
  };

  //Password requirements system that checks if the password contains the minimum requirements  
  const getUnmetPasswordRequirements = (password) => {
    const requirements = [];
    if (!/\d/.test(password)) {
      requirements.push('at least one number');
    }
    if (!/[A-Z]/.test(password)) {
      requirements.push('at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      requirements.push('at least one lowercase letter');
    }
    if (!/[$;._\-*]/.test(password)) {
      requirements.push('at least one of the following symbols: $ ; . _ - *');
    }
    if (!/^.{8,}$/.test(password)) {
      requirements.push('at least 8 characters')
    }
    return requirements;
  };

  return (
    <ScrollView style={styles.backgroundColorStyle}>
    <View style={styles.main_style}>      
      <Image source={require('../../../assets/logo.png')} style={styles.logo} />
      <View style={styles.login_box}>              
        {/* Extra field for NIF, conditionally rendered based on the selected account type */}
        {selectedAccountType === true && (
          <View style={styles.textBox}>
          <TextInput style={{paddingHorizontal: 15}} placeholder="NIF" onChangeText={(text) => setNif(text)}/>
          </View>
        )}
        <View style={styles.textBox}>
          <TextInput placeholder="Username" style={{ paddingHorizontal: 15 }} onChangeText={(text) => setUserName(text)}/>
        </View>
        <View style={styles.textBox}>
          <TextInput placeholder="Surname" style={{ paddingHorizontal: 15 }} onChangeText={(text) => setSurname(text)}/>
        </View>        
        <View style={styles.textBox}>
          <TextInput placeholder="Email@gmail.com" style={{ paddingHorizontal: 15 }} onChangeText={(text) => setEmail(text)}/>
        </View>                
        <View style={styles.textBox}>
          <TextInput
            placeholder="Password"
            style={{ paddingHorizontal: 15 }}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordRequirementsMessage('');
            }}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.textBox}>
          <TextInput
            placeholder="Confirm Password"
            style={{ paddingHorizontal: 15 }}
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry={true}
          />
        </View>
        <Picker selectedValue={selectedAccountType} onValueChange={(itemValue) => setSelectedAccountType(itemValue)} style={styles.textBox}>
          <Picker.Item label="Normal Account" value={false} />
          <Picker.Item label="Business Account" value={true} />
        </Picker>

        {isNifBlank ? (
          <Text style={styles.RequirementsMessage}>{isNifBlank}</Text>
        ) : null}
        {isUsernameBlank ? (
          <Text style={styles.RequirementsMessage}>{isUsernameBlank}</Text>
        ) : null}
        {isSurnameBlank ? (
          <Text style={styles.RequirementsMessage}>{isSurnameBlank}</Text>
        ) : null}
        {emailAlreadyRegisteredMessage ? (
          <Text style={styles.RequirementsMessage}>{emailAlreadyRegisteredMessage}</Text>
        ) : null}
        {validEmail ? (
          <Text style={styles.RequirementsMessage}>{validEmail}</Text>
        ) : null}
        {passwordRequirementsMessage ? (
          <Text style={styles.RequirementsMessage}>{passwordRequirementsMessage}</Text>
        ) : null}
        {isValidPassword ? (
          <Text style={styles.RequirementsMessage}>{isValidPassword}</Text>
        ) : null}

        <View style={styles.mainButton}>
          <TouchableOpacity style={styles.button_box} onPress={handleRegister}>
            <Text style={styles.textButton}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View>                
          <Text style={styles.signUpTxt}>
            Already have an account?
            <Text style={{color: 'blue'}} onPress={()=>props.navigation.popToTop()}> Login here</Text>                         
          </Text>         
        </View>
    </View>
    </View>    
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  backgroundColorStyle:{
    backgroundColor: '#F7F9F9', 
  },
  main_style: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',    
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: '5%',
    marginTop: '15%',
    borderRadius: 50,
    borderColor: 'black',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  login_box: {
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: '10%',
  },
  textBox: {
    paddingVertical: '5%',
    backgroundColor: '#cccccc40',
    borderRadius: 30,
    marginVertical: '2%',
  },
  mainButton: {
    alignItems: 'center',
  },
  button_box: {
    backgroundColor: '#525FE1',
    borderRadius: 30,
    paddingVertical: 20,
    width: 150,
    marginTop: 20,
  },
  textButton: {
    textAlign: 'center',
    color: 'white',
  },
  signUpTxt: {
    marginTop: 20,
    textAlign: 'center',
  },
  RequirementsMessage: {
    marginTop: 10,
    color: 'red',
    textAlign: 'center',
  },

});
