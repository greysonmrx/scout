import axios from 'axios';

const api = axios.create({
  baseURL: 'http://147.182.206.193:5000',
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('@Scout:token');
      localStorage.removeItem('@Scout:user');

      window.location.reload();
    }

    return Promise.reject(error);
  },
);

export default api;
