import axios from 'axios';
import notify from '@/utils/notify';

export const api = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  baseURL: import.meta.env.VITE_APP_API_URL,
});

api.interceptors.response.use(undefined, (error) => {
  if (!(typeof window !== 'undefined')) {
    return Promise.reject(error);
  }
  if (error.message === 'Network Error' && !error.response) {
    notify({
      title: 'Opps... algo deu errado!',
      message: 'Verifique a sua conexão com a internet!',
      type: 'danger',
    });
  }
  if (error?.response?.status > 403 || error?.response?.status < 499) {
    notify({
      title: 'Opps... algo deu errado!',
      message:
        error.response?.data?.message ??
        'Erro interno na aplicação! Por favor, tente novamente mais tarde.',
      type: 'danger',
    });
  }
  return Promise.reject(error);
});

export default api;
