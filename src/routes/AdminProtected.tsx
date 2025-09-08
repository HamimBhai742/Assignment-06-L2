/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import useAuth from '../hooks/useAuth';
import Loading from '../components/Loding/Loding';
import { Navigate } from 'react-router';
import toast from 'react-hot-toast';
import { useLogoutMutation } from '../redux/api/authApi';
import { useEffect } from 'react';
const AdminProtectedRoute = ({ children }: any) => {
  const { data, isLoading } = useAuth();
  const [logOut] = useLogoutMutation();
  if (isLoading) {
    return <Loading />;
  }
  if (data?.role === 'admin') {
    return children;
  }

  useEffect(() => {
    const run = async () => {
      await logOut();
      toast.error('You are not authorized to access this page');
    };
    run();
  }, [logOut]);

  return <Navigate to='/login' />;
};

export default AdminProtectedRoute;
