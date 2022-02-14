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
  InReview = 'IN_REVIEW',
  Approved = 'APPROVED',
  Rejected = 'REJECTED',
  ChangeRequested = 'CHANGE_REQUESTED',
  TerminatedApproved = 'TERMINATED_APPROVED',
  TerminatedRejected = 'TERMINATED_REJECTED',
}

export namespace SolicitacaoStatus {
  export function toString(status: SolicitacaoStatus): string {
    return status.replace('_', ' ');
  }
}
