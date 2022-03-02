import { Campus } from '.';

export type Instituicao = {
  [index: string]: string | Campus;
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
  orientadorEstagio: string;
  campus: Campus | string;
};
