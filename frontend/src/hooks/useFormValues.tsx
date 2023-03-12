import { dadosEstagioInitialValues } from '../pages/Solicitar/Steps/DadosEstagio/initialValues';
import { estagiarioInitialValues } from '../pages/Solicitar/Steps/Estagiario/initial-values';
import { instituicaoInitialValues } from '../pages/Solicitar/Steps/Instituicao/initial-values';

import { useUnidade } from '.';
import { Solicitacao } from '../models';

export default function useFormValues() {
  const { selectedUnidade } = useUnidade();

  let initialValues = {
    estagiario: estagiarioInitialValues,
    instituicao: instituicaoInitialValues,
    unidadeConcedente: selectedUnidade,
    dadosEstagio: dadosEstagioInitialValues,
  } as Solicitacao;

  const updateInitialValues = (newValues: Solicitacao) => {
    initialValues = newValues;
  };

  return { initialValues, updateInitialValues };
}
