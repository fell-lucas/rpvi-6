import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const endpoints = {
  solicitacoes: '/api/v1/solicitacoes',
  observacoes: '/api/v1/observacoes',
  auth: '/api/v1/auth',
  campus: '/api/v1/campus',
  unidade: '/api/v1/unidades',
};

/* istanbul ignore next */
api.interceptors.request.use(
  async (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${sessionStorage.getItem('token')}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);
