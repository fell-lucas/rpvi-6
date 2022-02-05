import { Estagiario, Instituicao, UnidadeConcedente } from '.';

export type Solicitacao = {
  estagiario: Estagiario;
  instituicao: Instituicao;
  unidadeConcedente: UnidadeConcedente;
};
