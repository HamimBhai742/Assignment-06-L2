import { Role } from '../interfaces/role.interfaces';
import { useCheckLoginQuery } from '../redux/api/authApi';

const useUser = () => {
  const { data, isLoading, error } = useCheckLoginQuery();
  console.log(data?.data.role, Role.ADMIN);
  if (data?.data.role === 'user') {
    return { user: data?.data };
  } else {
    return error;
  }
};

export default useUser;
