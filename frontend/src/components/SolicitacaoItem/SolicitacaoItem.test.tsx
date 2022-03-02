import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import SolicitacaoItem from '.';
import { Solicitacao, SolicitacaoStatus } from '../../models';

const mockSolicitacao = {
  estagiario: {
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    bairro: '',
    cep: '',
    cidade: '',
    uf: '',
    campus: {
      cidade: '',
      id: '',
    },
    matricula: '',
    curso: '',
    semestre: '',
    estagioObrigatorio: '',
  },
  unidadeConcedente: {
    razaoSocial: '',
    telefone: '',
    endereco: '',
    bairro: '',
    cep: '',
    cidade: '',
    uf: '',
    cnpj: '',
    supervisorEstagio: '',
    cargoSupervisor: '',
    representanteLegal: '',
    cargoRepresentante: '',
  },
  instituicao: {
    razaoSocial: '',
    telefone: '',
    endereco: '',
    bairro: '',
    cep: '',
    cidade: '',
    uf: '',
    cnpj: '',
    representanteLegal: '',
    cargoRepresentante: '',
    orientadorEstagio: '',
    campus: '',
  },
  status: SolicitacaoStatus.Approved,
  updated_at: '2022-02-20T18:50:09.882Z',
} as Solicitacao;

test('renders item', () => {
  render(
    <BrowserRouter>
      <SolicitacaoItem solicitacao={mockSolicitacao} />
    </BrowserRouter>
  );
  const elem = screen.getByTestId(/solicitacao_item_div/i);
  expect(elem).toBeInTheDocument();
});
