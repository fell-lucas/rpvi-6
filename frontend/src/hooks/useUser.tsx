import useAxios from 'axios-hooks';

import { User, UserRole } from '../models';
import { endpoints } from '../services';

export default function useUser() {
  const [{ data, loading }] = useAxios<User>(`${endpoints.auth}/active`);

  return {
    user: data,
    isAluno: data?.role === UserRole.ALUNO,
    isUserLoading: loading,
  };
}
