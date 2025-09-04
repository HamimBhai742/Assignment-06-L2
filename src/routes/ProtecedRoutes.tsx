/* eslint-disable @typescript-eslint/no-explicit-any */
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';
import toast from 'react-hot-toast';

const ProtecedRoutes = ({ children }:any) => {
  const { data, isLoading, error } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (data) {
    return children;
  }

  const err = error as { data: { message: string } };
  const errSrc = error as {
    data: { errorSource: { message: string }[] };
  };
  if (errSrc.data.errorSource.length > 0) {
    toast.error(errSrc.data.errorSource[0].message);
  } else {
    toast.error(err.data.message);
  }

  if (error) {
    if (err) {
      toast.error(err.data.message);
    } else {
      toast.error(errSrc.data.errorSource[0].message);
    }
    return <Navigate to='/login' />;
  }
};

export default ProtecedRoutes;
