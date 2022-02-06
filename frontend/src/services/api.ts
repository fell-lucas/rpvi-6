import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const endpoints = {
  solicitacoes: '/api/v1/solicitacoes',
};
