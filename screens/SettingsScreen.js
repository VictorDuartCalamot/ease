import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Keyboard,
} from 'react-native';

const App = () => {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');

  const handleAddItem = () => {
    if (itemName && itemPrice && itemQuantity) {
      const newItem = {
        id: Date.now().toString(),
        name: itemName,
        quantity: parseInt(itemQuantity, 10),
        price: parseFloat(itemPrice),
      };

      setItems([...items, newItem]);
      setItemName('');
      setItemPrice('');
      setItemQuantity('');
      Keyboard.dismiss();
    }
  };

  const handleEditItem = (id) => {
    // Implementa la lógica para editar un elemento
    // Esto podría abrir un modal de edición con TextInput y luego actualizar el estado
  };

  const handleDeleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  const calculateTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Compras</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre del objeto"
          value={itemName}
          onChangeText={(text) => setItemName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Cantidad"
          keyboardType="numeric"
          value={itemQuantity}
          onChangeText={(text) => setItemQuantity(text.replace(/[^0-9]/g, ''))}
        />
        <TextInput
          style={styles.input}
          placeholder="Precio"
          keyboardType="numeric"
          value={itemPrice}
          onChangeText={(text) => setItemPrice(text.replace(/[^0-9.]/g, ''))}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
          <Text>Añadir</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>{item.name} - {item.quantity} x ${item.price.toFixed(2)}</Text>
            <View style={styles.itemButtons}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEditItem(item.id)}
              >
                <Text>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteItem(item.id)}
              >
                <Text>Borrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <Text style={styles.total}>Total: ${calculateTotalPrice().toFixed(2)}</Text>
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
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  addButton: {
    backgroundColor: '#4caf50',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#2196F3',
    padding: 4,
    marginHorizontal: 4,
    borderRadius: 4,
  },
  deleteButton: {
    backgroundColor: '#FF5252',
    padding: 4,
    marginHorizontal: 4,
    borderRadius: 4,
  },
  total: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
