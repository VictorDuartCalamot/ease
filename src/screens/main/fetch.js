import { View, Text, FlatList, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { firebase } from '../config';
import { Ionicons } from '@expo/vector-icons';

const Fetch = () => {
  const [users, setUsers] = useState([]);
  const TodoRef = firebase.firestore().collection('user');

  useEffect(() => {
    const unsubscribe = TodoRef.onSnapshot(async (querySnapshot) => {
      const users = [];
      for (const doc of querySnapshot.docs) {
        const { email, username, surname, role } = doc.data();
        users.push({
          id: doc.id,
          email,
          username,
          surname,
          role,
        });
      }
      setUsers(users);
    });

    return () => unsubscribe();
  }, []);

  const handleEdit = (userId) => {
    console.log(`Edit user with ID: ${userId}`);
  };

  const handleAddUser = () => {
    // Lógica para añadir un nuevo usuario
    console.log('Añadir usuario');
  };

  return (
    <View style={{ flex: 1, marginTop: 100 }}>
      <FlatList
        style={{ flex: 1 }}  // Establecer flex: 1 en lugar de height: '100%'
        data={users}
        numColumns={1}
        renderItem={({ item }) => (
          <Pressable style={styles.container}>
            <View style={styles.innerContainer}>
              <View style={styles.textContainer}>
                <Text>
                  User:
                  <Text style={styles.itemusername}> {item.username}</Text>
                </Text>
                <Text>
                  Email:
                  <Text style={styles.itememail}> {item.email}</Text>
                </Text>
                <Text>
                  Role:
                  <Text style={styles.itemRole}> {item.role}</Text>
                </Text>
              </View>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item.id)}>
                <Ionicons name="ios-create-outline" size={18} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.editButton2} onPress={() => handleEdit(item.id)}>
                <Ionicons name="trash-outline" size={18} color="#000" />
              </TouchableOpacity>
            </View>
          </Pressable>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddUser}>
        <Text style={styles.buttonText}>Añadir usuario</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Fetch;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e5e5e5',
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  itememail: {
    fontWeight: 'bold',
  },
  itemRole: {
    fontWeight: 'bold',
    color: 'red',
  },
  editButton: {
    padding: 10,
    borderRadius: 5,
  },
  editButton2: {
    padding: 10,
    borderRadius: 5,
  },
  addButton: {
    position: 'absolute',
    top: "-10%",
    right: 10,
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
