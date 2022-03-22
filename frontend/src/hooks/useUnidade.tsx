import useAxios from 'axios-hooks';

import { unidadeInitialValues } from '../pages/Solicitar/Steps/UnidadeConcedente/initialValues';

import { UnidadeConcedente } from '../models';
import { endpoints } from '../services';

export default function useUnidade() {
  const [{ data, loading, error }, unidadeRefetch] = useAxios<
    UnidadeConcedente[]
  >(endpoints.unidade);

  let selectedUnidade = unidadeInitialValues;

  const setSelected = (id: string) => {
    try {
      selectedUnidade = data?.filter((u) => u.id === id)[0]!;
    } catch (error) {
      selectedUnidade = unidadeInitialValues;
    }
    return selectedUnidade;
  };

  return {
    unidadeList: data,
    unidadeLoading: loading,
    unidadeError: error,
    unidadeRefetch,
    selectedUnidade,
    setSelected,
  };
}
