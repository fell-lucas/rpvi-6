export type Estagiario = {
  [index: string]: string | boolean;
  id: string;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  bairro: string;
  cep: string;
  cidade: string;
  uf: string;
  campus: string;
  matricula: string;
  curso: string;
  semestre: string;
  estagioObrigatorio: string | boolean;
};
