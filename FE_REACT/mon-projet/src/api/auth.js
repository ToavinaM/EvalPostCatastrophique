import axios from './axiosInstance';
// src/api/auth.js
// import axios from './axiosInstance'; // ou axios directement

export const login = (credentials) => {
    return axios.post('/auth/login', credentials);
};

export const register = async (userData) => {
    const response = await axios.post('/auth/register', userData);
    return response.data;
};
