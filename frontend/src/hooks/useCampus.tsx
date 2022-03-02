import useAxios from 'axios-hooks';

import { Campus } from '../models';
import { endpoints } from '../services';

export default function useCampus() {
  const [{ data, loading, error }, campusRefetch] = useAxios<Campus[]>(
    endpoints.campus
  );

  return {
    campusList: data,
    campusLoading: loading,
    campusError: error,
    campusRefetch,
  };
}
