import axios from 'axios';
import { configure } from 'axios-hooks';

export const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const endpoints = {
  solicitacoes: '/api/v1/solicitacoes',
};

configure({ axios });
