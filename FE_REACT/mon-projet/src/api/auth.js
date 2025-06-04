import axiosInstance from './axiosInstance';

export const login = (credentials) => {
    return axiosInstance.post('/auth/login', credentials);
};
export const register = (credentials) => {
    return axiosInstance.post('/auth/register', credentials);
};

// export const register = async (userData) => {
//     const response = await axios.post('/auth/register', userData);
//     return response.data;
// };
