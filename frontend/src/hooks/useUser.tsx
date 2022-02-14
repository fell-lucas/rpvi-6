import useAxios from 'axios-hooks';

import { User } from '../models';
import { endpoints } from '../services';

export default function useUser() {
  const [{ data, loading }] = useAxios<User>(`${endpoints.auth}/active`);

  return {
    user: data,
    isUserLoading: loading,
  };
}
