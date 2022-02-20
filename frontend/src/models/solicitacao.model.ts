import { Estagiario, Instituicao, Observacao, UnidadeConcedente } from '.';

export interface Solicitacao {
  [index: string]:
    | Estagiario
    | Instituicao
    | UnidadeConcedente
    | SolicitacaoStatus
    | Observacao[]
    | undefined
    | string;
  id: string;
  status: SolicitacaoStatus;
  estagiario: Estagiario;
  instituicao: Instituicao;
  unidadeConcedente: UnidadeConcedente;
  observacoes?: Observacao[];
}

export enum SolicitacaoStatus {
  InReview = 'IN_REVIEW',
  Approved = 'APPROVED',
  Rejected = 'REJECTED',
  ChangeRequested = 'CHANGE_REQUESTED',
  TerminatedApproved = 'TERMINATED_APPROVED',
  TerminatedRejected = 'TERMINATED_REJECTED',
}

export namespace SolicitacaoStatus {
  export function toString(status?: SolicitacaoStatus): string {
    const map = {
      [SolicitacaoStatus.InReview]: 'EM ANÁLISE',
      [SolicitacaoStatus.Approved]: 'APROVADO',
      [SolicitacaoStatus.Rejected]: 'REJEITADO',
      [SolicitacaoStatus.ChangeRequested]: 'MUDANÇA REQUISITADA',
      [SolicitacaoStatus.TerminatedApproved]: 'TERMINADO APROVADO',
      [SolicitacaoStatus.TerminatedRejected]: 'TERMINADO REJEITADO',
    };
    return status !== undefined ? map[status] : '';
  }
}
