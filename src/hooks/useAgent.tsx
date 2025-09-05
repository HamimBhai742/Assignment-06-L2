import { Role } from '../interfaces/role.interfaces';
import { useCheckLoginQuery } from '../redux/api/authApi';

const useAgent = () => {
  const { data, error } = useCheckLoginQuery();
  if (data?.data.role === Role.AGENT) {
    return { agent: data?.data };
  } else {
    return error;
  }
};

export default useAgent;
