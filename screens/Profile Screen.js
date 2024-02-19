import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ProfileSettingsScreen = () => {
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangeEmail = () => {
    // Implementa la lógica para cambiar el correo electrónico
    console.log('Cambiar correo electrónico:', newEmail);
  };

  const handleChangePassword = () => {
    // Implementa la lógica para cambiar la contraseña
    console.log('Cambiar contraseña:', newPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración del Perfil</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nuevo Correo Electrónico:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese el nuevo correo electrónico"
          value={newEmail}
          onChangeText={(text) => setNewEmail(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleChangeEmail}>
          <Text>Cambiar Correo Electrónico</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nueva Contraseña:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese la nueva contraseña"
          secureTextEntry
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
        />
        <Text style={styles.label}>Confirmar Contraseña:</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirme la nueva contraseña"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text>Cambiar Contraseña</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: '#4caf50',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
});

export default ProfileSettingsScreen;
