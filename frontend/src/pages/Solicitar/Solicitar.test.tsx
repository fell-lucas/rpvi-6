import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import SolicitacaoError from './Error';
import Estagiario from './Estagiario';
import Instituicao from './Instituicao';
import SolicitacaoSuccess from './Success';
import UnidadeConcedente from './UnidadeConcedente';

test('renders estagiario form page', () => {
  render(
    <BrowserRouter>
      <Estagiario />
    </BrowserRouter>
  );
  const elem = screen.getByText(/ESTAGIÁRIO/i);
  expect(elem).toBeInTheDocument();
});

test('renders instituicao form page', () => {
  render(
    <BrowserRouter>
      <Instituicao />
    </BrowserRouter>
  );
  const elem = screen.getByText(/INSTITUIÇÃO DE ENSINO/i);
  expect(elem).toBeInTheDocument();
});

test('renders unidade concedente form page', () => {
  render(
    <BrowserRouter>
      <UnidadeConcedente />
    </BrowserRouter>
  );
  const elem = screen.getByText(/UNIDADE CONCEDENTE\/SETOR DA UNIPAMPA/i);
  expect(elem).toBeInTheDocument();
});

test('renders sucesso form page', () => {
  render(
    <BrowserRouter>
      <SolicitacaoSuccess />
    </BrowserRouter>
  );
  const elem = screen.getByText(/CONCLUÍDA COM SUCESSO/i);
  expect(elem).toBeInTheDocument();
});

test('renders error form page', () => {
  render(
    <BrowserRouter>
      <SolicitacaoError />
    </BrowserRouter>
  );
  const elem = screen.getByText(/NÃO FOI CONCLUÍDA/i);
  expect(elem).toBeInTheDocument();
});
