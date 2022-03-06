import { Estagiario, Instituicao } from '../models';

export const mapEstagiario = (estagiario: Estagiario) => {
  const estagioObrigatorio = estagiario.estagioObrigatorio === 'Obrigatório';
  return {
    ...estagiario,
    campus: { id: estagiario.campus },
    estagioObrigatorio,
  };
};

export const mapInstituicao = (instituicao: Instituicao) => {
  return {
    ...instituicao,
    campus: { id: instituicao.campus },
    orientadorEstagio: { id: instituicao.orientadorEstagio },
  };
};
