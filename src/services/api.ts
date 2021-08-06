import axios from 'axios';

const api = axios.create({
  baseURL: 'http://147.182.206.193:5000',
});

export default api;
