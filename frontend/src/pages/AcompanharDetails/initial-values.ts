import { Solicitacao } from '../../models';

export const initialValues = (solicitacao: Solicitacao) => ({
  ...solicitacao,
  estagiario: {
    ...solicitacao.estagiario,
    estagioObrigatorio: solicitacao.estagiario.estagioObrigatorio
      ? 'Obrigatório'
      : 'Não obrigatório',
  },
});
