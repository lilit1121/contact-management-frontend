import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.BASE_URL || 'http://192.168.0.117:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export const isAxiosError = axios.isAxiosError;
export default apiClient;
