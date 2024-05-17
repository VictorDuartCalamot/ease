import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import WebSocket from 'react-native-websocket';


const ChatComponent = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (websocket.current) {
      websocket.current.send(newMessage);
      setNewMessage('');
    }
  };

  const websocket = React.useRef(null);

  return (
    <View style={{ padding: 20 }}>
      <ScrollView style={{ height: 300, marginBottom: 20 }}>
        {messages.map((msg, index) => (
          <Text key={index} style={{ fontSize: 18, marginBottom: 10 }}>
            {msg}
          </Text>
        ))}
      </ScrollView>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
        onChangeText={text => setNewMessage(text)}
        value={newMessage}
      />
      <Button title="Send Message" onPress={sendMessage} />
      <WebSocket
        ref={websocket}
        url={`ws://https://easeapi.onrender.com/ws/chat/${chatId}/`}
        onOpen={() => console.log('WebSocket Connected')}
        onMessage={event => {
          const data = JSON.parse(event.data);
          setMessages(prevMessages => [...prevMessages, data.message]);
        }}
        onError={error => console.log('WebSocket Error', error)}
        onClose={() => console.log('WebSocket Closed')}
      />
    </View>
  );
};

export default ChatComponent;
