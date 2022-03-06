import useAxios from 'axios-hooks';

import { User } from '../models/';
import { endpoints } from '../services';

export default function useOrientador(campusId: string) {
  const [{ data, loading, error }, orientadorRefetch] = useAxios<User[]>(
    `${endpoints.auth}/orientadores/${campusId}`
  );

  return {
    orientadorList: data,
    orientadorLoading: loading,
    orientadorError: error,
    orientadorRefetch,
  };
}
