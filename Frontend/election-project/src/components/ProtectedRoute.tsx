import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../store/features/userSlice/userSlice';
import { RootState } from '../store/store';
import { Navigate } from 'react-router-dom';
import { AppDispatch } from '../store/store';
import { useDispatch } from 'react-redux';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const { token, status } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (token && (status === 'idle' || status === 'pending')) {
      dispatch(getUser(token));
    }
  }, [dispatch, token, status]);
  

  if (status === 'pending') {
    return <p>Loading...</p>;
  }

  if (!token || status === 'rejected') {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
