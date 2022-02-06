import { Estagiario, Instituicao, UnidadeConcedente } from '.';

export type Solicitacao = {
  [index: string]: Estagiario | Instituicao | UnidadeConcedente;
  estagiario: Estagiario;
  instituicao: Instituicao;
  unidadeConcedente: UnidadeConcedente;
};
