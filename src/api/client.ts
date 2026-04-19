import axios from 'axios';

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor de errores global
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err.response?.data?.error || 'Error en la API';
    throw new Error(message);
  }
);
