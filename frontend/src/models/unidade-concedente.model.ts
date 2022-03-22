export type UnidadeConcedente = {
  [index: string]: string | undefined;
  id?: string;
  razaoSocial: string;
  telefone: string;
  endereco: string;
  bairro: string;
  cep: string;
  cidade: string;
  uf: string;
  cnpj: string;
  supervisorEstagio: string;
  cargoSupervisor: string;
  representanteLegal: string;
  cargoRepresentante: string;
};
