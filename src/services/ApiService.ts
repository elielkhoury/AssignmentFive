import axios from 'axios';

const apiClient = axios.create({
  baseURL:
    'https://api.nasa.gov/planetary/apod?api_key=dWZbWwet7ER903TtMuWsyphZf4KR1dUfZkIimTP4',
  headers: {
    'Content-Type': 'application/json',
  },
});

interface PhotoData {
  uri: string;
  latitude: number;
  longitude: number;
  timestamp: string;
}

export const fetchPhotos = async () => {
  try {
    const response = await apiClient.get('/photos');
    return response.data;
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
};

export const addPhoto = async (photoData: PhotoData) => {
  try {
    const response = await apiClient.post('/photos', photoData);
    return response.data;
  } catch (error) {
    console.error('Error adding photo:', error);
    throw error;
  }
};
