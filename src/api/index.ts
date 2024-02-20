import axios, { AxiosInstance } from 'axios';
import { setInterceptors } from './interceptor';
import { useAuthStore } from '@/store/auth';

const PROD = import.meta.env?.PROD;
const url = PROD ? 'http://www.cuberoom.net/api' : 'http://localhost:4000/api';
// import.meta.env?.MODE: 'production' | 'development'

const createAxios = (): AxiosInstance => {
  const createAxios = axios.create({
    baseURL: url,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${useAuthStore.accessToken}`,
    },
    timeout: 3000,
  });

  return setInterceptors(createAxios);
};

const api = createAxios();

export default api;
