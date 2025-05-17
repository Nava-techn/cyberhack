// src/services/eventCardService.js

import axios from 'axios';

const API_URL = 'https://localhost:8000/api/event-card/random'; // Assurez-vous que ce port est correct

export const fetchRandomEventCard = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching event card:', error);
    throw error;
  }
};
