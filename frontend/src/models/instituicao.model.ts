import { Campus, User } from '.';

export type Instituicao = {
  [index: string]: string | Campus | User;
  id: string;
  razaoSocial: string;
  telefone: string;
  endereco: string;
  bairro: string;
  cep: string;
  cidade: string;
  uf: string;
  cnpj: string;
  representanteLegal: string;
  cargoRepresentante: string;
  orientadorEstagio: User | string;
  campus: Campus | string;
};
