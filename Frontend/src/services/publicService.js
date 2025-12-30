import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchAllClubs = async () => {
    const response = await axios.get(`${API_BASE_URL}/clubs`);
    return response.data; 
};

export const fetchAllEvents = async () => {
    const response = await axios.get(`${API_BASE_URL}/events`);
    return response.data; 
};