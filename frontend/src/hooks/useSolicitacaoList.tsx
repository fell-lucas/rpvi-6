/* istanbul ignore file */
import useAxios from 'axios-hooks';

import { SolicitacaoList } from '../models';
import { endpoints } from '../services';

export default function useSolicitacaoList(page?: string | null) {
  const [{ data, loading, error }, refetchSolicitationList] =
    useAxios<SolicitacaoList>(`${endpoints.solicitacoes}?page=${page ?? '1'}`);

  return { data, loading, error, refetchSolicitationList };
}
