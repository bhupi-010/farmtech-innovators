import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AXIOS_TIMEOUT = 120000;

const parseToken = (token: string) => {
  try {
    return JSON.parse(token);
  } catch (err) {
    return null;
  }
};

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: AXIOS_TIMEOUT,
});

apiClient.interceptors.request.use(
  (config) => {
    const storedToken = localStorage.getItem('access');
    const storedRefreshToken = localStorage.getItem('refresh');
    const token = storedToken ? JSON.parse(storedToken) : null;
    const refreshToken = storedRefreshToken ? parseToken(storedRefreshToken) : null;

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // if (refreshToken) {
    //   config.headers['x-refresh-token'] = `${refreshToken}`;
    // }

    return config;
  },
  (error) => {
    return Promise.reject(error.response.data);
  }
);

// response interceptor
apiClient.interceptors.response.use(
  (response) => {
    const newRefreshToken = response.headers['x-refresh'];
    const newAccessToken = response.headers['x-access'];

    if (newRefreshToken && newAccessToken) {
      localStorage.setItem('refresh', JSON.stringify(newRefreshToken));
      localStorage.setItem('access', JSON.stringify(newAccessToken));
    }
    return response;
  },
  async (err) => {
    const storedToken = localStorage.getItem('access');
    const token = storedToken ? JSON.parse(storedToken) : null;
    if (token) {
      const parsedUser = jwtDecode(token);
      const tokenExpiry = parsedUser.exp;
      const currentTime = Math.floor(Date.now() / 1000);
      if (tokenExpiry && tokenExpiry < currentTime) {
        localStorage.removeItem('access');
        localStorage.removeItem('user');
        localStorage.removeItem('refresh');
        window.location.reload();
      }
    }
    if (err?.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('refresh');
      window.location.reload();
    }
    return Promise.reject(err?.response?.data);
  }
);
