import useAxios from 'axios-hooks';

import { Campus } from '../models';
import { endpoints } from '../services';

export default function useUnidade() {
  const [{ data, loading, error }, unidadeRefetch] = useAxios<Campus[]>(
    endpoints.unidade
  );

  return {
    unidadeList: data,
    unidadeLoading: loading,
    unidadeError: error,
    unidadeRefetch,
  };
}
