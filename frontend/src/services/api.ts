import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const endpoints = {
  solicitacoes: '/api/v1/solicitacoes',
  auth: '/api/v1/auth',
};
