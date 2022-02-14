import { Estagiario } from '../models';

export const mapEstagiario = (estagiario: Estagiario) => {
  const estagioObrigatorio = estagiario.estagioObrigatorio === 'Obrigatório';
  return {
    ...estagiario,
    estagioObrigatorio,
  };
};
