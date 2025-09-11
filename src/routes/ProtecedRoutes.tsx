/* eslint-disable @typescript-eslint/no-explicit-any */
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';
import Loading from '../components/Loding/Loding';
import toast from 'react-hot-toast';

const ProtecedRoutes = ({ children }: any) => {
  const { data, isLoading, error } = useAuth();
  const err = error as { data: { message: string } };
  if (isLoading) {
    return <Loading />;
  }
  if (data) {
    return children;
  }
  if (error) {
    toast.error(err?.data?.message);
    return <Navigate to='/login' />;
  }
  return <Navigate to='/login' />;
};

export default ProtecedRoutes;
