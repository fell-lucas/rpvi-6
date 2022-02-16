import { render, screen } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter } from 'react-router-dom';

import Acompanhar from '.';
import { api, endpoints } from '../../services';

const acompanhamentosMock = Array.from({ length: 10 }, (_, x) => ({
  id: '40d78f48-3a86-49e4-83ae-6de02a47e4fa' + x,
  status: 'IN_REVIEW',
  updated_at: '2022-02-14T00:30:25.507Z',
  instituicao: {
    razaoSocial: '1',
  },
  estagiario: {
    nome: 'Igor',
  },
  unidadeConcedente: {
    razaoSocial: '1',
  },
}));

describe('acompanhar page', () => {
  let mock = new MockAdapter(api);
  test('renders acompanhar', () => {
    mock
      .onGet(`${endpoints.solicitacoes}?page=1`)
      .reply(200, acompanhamentosMock);
    render(
      <BrowserRouter>
        <Acompanhar />
      </BrowserRouter>
    );
    const elem = screen.getByText(/SOLICITAÇÕES PENDENTES/i);
    expect(elem).toBeInTheDocument();
  });
});
