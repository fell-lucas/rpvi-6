/* istanbul ignore file */
import useAxios from 'axios-hooks';

import { SolicitacaoList } from '../models';
import { endpoints } from '../services';

export default function useSolicitacaoList(page?: string | null) {
  const [{ data, loading, error }, refetchSolicitationList] =
    useAxios<SolicitacaoList>(`${endpoints.solicitacoes}?page=${page ?? '1'}`);

  // if (!loading && error) {
  //   throw new Error(JSON.stringify(error.response?.data));
  // }
  return { data, loading, error, refetchSolicitationList };
}
