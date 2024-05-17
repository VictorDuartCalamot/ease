import axios from 'axios';
const BASE_URL = 'https://easeapi.onrender.com/api';

export const getOrCreateChat = async () => {
    try {
        token = await AsyncStorage.getItem('Token')
        const headers = {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
        };
        const response = await axios.post(`${BASE_URL}/chats/get-or-create/`, {headers
        // Aquí puedes enviar datos adicionales si tu lógica de backend lo requiere
        });
        if (response.status === 200) {
            console.log('Chat found or created successfully:', response.data);
            return response.data;  // Retorna los detalles del chat
        } else {
            console.error('Failed to get or create chat:', response.status);
            return null;
        }
    } catch (error) {
      console.error('Error fetching or creating chat:', error);
      return null;
    }
  };
  
  