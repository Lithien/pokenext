import axios from 'axios';

export const pokeApi = axios.create({
  baseURL: '/api/pokeapi',
  headers: {
    Accept: 'application/json',
    'X-Client-Name': 'PokedexApp-NextJS-ReactQuery',
  },
});

pokeApi.interceptors.response.use(
  (res) => res,
  (error: unknown) => {
    if (axios.isAxiosError<{ error?: string }>(error)) {
      throw new Error(
        error.response?.data?.error ?? error.message ?? 'Error en la API'
      );
    }
    throw error;
  }
);
