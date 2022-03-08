import { Campus, Solicitacao, User } from '../../models';

export const initialValues = (solicitacao: Solicitacao) => ({
  ...solicitacao,
  estagiario: {
    ...solicitacao.estagiario,
    campus: (solicitacao.estagiario.campus as Campus).id,
    // estagioObrigatorio: solicitacao.estagiario.estagioObrigatorio
    //   ? 'Obrigatório'
    //   : 'Não obrigatório',
  },
  instituicao: {
    ...solicitacao.instituicao,
    campus: (solicitacao.instituicao.campus as Campus).id,
    orientadorEstagio: (solicitacao.instituicao.orientadorEstagio as User).id,
  },
  dadosEstagio:{
    ...solicitacao.dadosEstagio,
    estagioObrigatorio: solicitacao.dadosEstagio.estagioObrigatorio
      ? 'Obrigatório'
      : 'Não obrigatório',
    remunerado: solicitacao.dadosEstagio.remunerado
      ? 'Remunerado'
      : 'Não remunerado',
  }
});
