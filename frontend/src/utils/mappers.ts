import { Estagiario } from '../models';

export const mapEstagiario = (estagiario: Estagiario) => {
  return {
    ...estagiario,
    estagioObrigatorio: estagiario.estagioObrigatorio === 'Obrigatório',
  };
};
