import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000', // 🔁 adapte à ton back
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
