import { render, screen, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter } from 'react-router-dom';

import Acompanhar from '.';
import { api, endpoints } from '../../services';

const acompanhamentosMock = {
  solicitations: Array.from({ length: 10 }, (_, x) => ({
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
  })),
};

describe('acompanhar page', () => {
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useSearchParams: () => [new URLSearchParams('?page=1')],
  }));
  const mock = new MockAdapter(api);
  test('renders acompanhar with solicitations list', async () => {
    mock
      .onGet(`${endpoints.solicitacoes}?page=1`)
      .reply(200, acompanhamentosMock);
    render(
      <BrowserRouter>
        <Acompanhar />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/SOLICITAÇÕES PENDENTES/i)).toBeInTheDocument();
      expect(
        screen.getByTestId('40d78f48-3a86-49e4-83ae-6de02a47e4fa0')
      ).toBeInTheDocument();
    });
  });

  test('renders acompanhar with request loading', async () => {
    mock.onGet(`${endpoints.solicitacoes}?page=1`).reply(500);
    render(
      <BrowserRouter>
        <Acompanhar />
      </BrowserRouter>
    );
    await waitFor(() =>
      expect(screen.getByTestId('loading_acompanhamentos')).toBeInTheDocument()
    );
  });
});
