import { useCheckLoginQuery } from '../redux/api/authApi';

const useAuth = () => {
  const { data, isLoading, error } = useCheckLoginQuery(undefined);
  return { data: data?.data, isLoading, error };
};

export default useAuth;
