import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import EstagiarioStep from './Steps/Estagiario';
import InstituicaoStep from './Steps/Instituicao';
import UnidadeConcedenteStep from './Steps/UnidadeConcedente';

test('renders estagiario form page', () => {
  render(
    <BrowserRouter>
      <EstagiarioStep errors={{}} touched={{}} />
    </BrowserRouter>
  );
  const elem = screen.getByText(/ESTAGIÁRIO/i);
  expect(elem).toBeInTheDocument();
});

test('renders instituicao form page', () => {
  render(
    <BrowserRouter>
      <InstituicaoStep errors={{}} touched={{}} />
    </BrowserRouter>
  );
  const elem = screen.getByText(/INSTITUIÇÃO DE ENSINO/i);
  expect(elem).toBeInTheDocument();
});

test('renders unidade concedente form page', () => {
  render(
    <BrowserRouter>
      <UnidadeConcedenteStep errors={{}} touched={{}} />
    </BrowserRouter>
  );
  const elem = screen.getByText(/UNIDADE CONCEDENTE\/SETOR DA UNIPAMPA/i);
  expect(elem).toBeInTheDocument();
});
