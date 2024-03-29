import {
  DadosEstagio,
  Estagiario,
  Instituicao,
  UnidadeConcedente,
} from '../models';

export const mapEstagiario = (estagiario: Estagiario) => {
  return {
    ...estagiario,
    campus: { id: estagiario.campus },
  };
};

export const mapDadosEstagio = (dados: DadosEstagio) => {
  const estagioObrigatorio = dados.estagioObrigatorio === 'Obrigatório';
  const remunerado = dados.remunerado === 'Remunerado';
  return {
    ...dados,
    estagioObrigatorio,
    remunerado,
    valorRemuneracao: remunerado ? dados.valorRemuneracao : '',
  };
};

export const mapInstituicao = (instituicao: Instituicao) => {
  return {
    ...instituicao,
    campus: { id: instituicao.campus },
    orientadorEstagio: { id: instituicao.orientadorEstagio },
  };
};

export const mapUnidadeConcedente = (unidade: UnidadeConcedente) => {
  const uni = {
    ...unidade,
    id: unidade.id,
  };
  if (unidade.id === '') {
    delete uni.id;
  }
  return uni;
};
