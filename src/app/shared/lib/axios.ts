import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AXIOS_TIMEOUT = 120000;

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: AXIOS_TIMEOUT,
});

apiClient.interceptors.request.use(
  (config) => {
    const storedToken = localStorage.getItem('token');
    const token = storedToken ? JSON.parse(storedToken) : null;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error.response.data)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (err) => {
    const storedToken = localStorage.getItem('token');
    const token = storedToken ? JSON.parse(storedToken) : null;
    if (token) {
      const parsedUser = jwtDecode(token);
      const tokenExpiry = parsedUser.exp;
      const currentTime = Math.floor(Date.now() / 1000);
      if (tokenExpiry && tokenExpiry < currentTime) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload();
      }
    }
    if (err?.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.reload();
    }
    return Promise.reject(err?.response?.data);
  }
);
