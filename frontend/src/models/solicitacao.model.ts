import { Estagiario, Instituicao, UnidadeConcedente } from '.';

export type Solicitacao = {
  [index: string]:
    | Estagiario
    | Instituicao
    | UnidadeConcedente
    | SolicitacaoStatus
    | string;
  id: string;
  status: SolicitacaoStatus;
  estagiario: Estagiario;
  instituicao: Instituicao;
  unidadeConcedente: UnidadeConcedente;
};

export enum SolicitacaoStatus {
  InProgress = 'IN_PROGRESS',
  Approved = 'APPROVED',
  Rejected = 'REJECTED',
}

export namespace SolicitacaoStatus {
  export function toString(status: SolicitacaoStatus): string {
    return status.replace('_', ' ');
  }

  export function fromString(status: string): SolicitacaoStatus {
    return (SolicitacaoStatus as any)[status];
  }
}
