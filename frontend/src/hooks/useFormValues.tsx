import { dadosEstagioInitialValues } from '../pages/Solicitar/Steps/DadosEstagio/initialValues';
import { estagiarioInitialValues } from '../pages/Solicitar/Steps/Estagiario/initial-values';
import {
  instituicaoInitialValues,
  mapCampusWithAddress,
} from '../pages/Solicitar/Steps/Instituicao/initial-values';

import { useUnidade } from '.';
import { Solicitacao } from '../models';
import useUser from './useUser';

export default function useFormValues() {
  const { user } = useUser();
  const { selectedUnidade } = useUnidade();
  let initialValues = {
    estagiario: {
      ...estagiarioInitialValues,
      nome: user?.name || '',
      email: user?.email || '',
      matricula: user?.matricula || '',
      campus: user?.campus.id || '',
    },
    instituicao: {
      ...instituicaoInitialValues,
      ...mapCampusWithAddress(user?.campus!),
    },
    unidadeConcedente: selectedUnidade,
    dadosEstagio: dadosEstagioInitialValues,
  } as Solicitacao;

  const updateInitialValues = (newValues: Solicitacao) => {
    initialValues = newValues;
  };

  return { initialValues, updateInitialValues };
}
