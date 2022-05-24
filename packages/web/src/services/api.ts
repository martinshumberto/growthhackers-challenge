import axios from 'axios';
import notify from '@/utils/notify';

export const api = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  baseURL: process.env.NEXT_PUBLIC_API_HOST_URL,
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
  if (error && error.response && error.response.status === 403) {
    notify({
      title: 'Opps... algo deu errado!',
      message:
        error.response?.data?.message ??
        'Erro interno na aplicação! Por favor, tente novamente mais tarde.',
      type: 'danger',
    });
  }
  // if (error && error.response && error.response.status === 412) {
  //   store.addNotification({
  //     title: __('somethingWentWorng'),
  //     message: error.response?.data?.message,
  //     type: 'danger',
  //     insert: 'bottom',
  //     container: 'bottom-right',
  //     animationIn: ['animate__animated', 'animate__fadeIn'],
  //     animationOut: ['animate__animated', 'animate__fadeOut'],
  //     dismiss: {
  //       duration: 3000,
  //       onScreen: true,
  //     },
  //   });
  // }
  return Promise.reject(error);
});

export default api;
