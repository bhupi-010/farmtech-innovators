import { Navigate, Outlet } from 'react-router-dom';
import { notifications } from '@mantine/notifications';

import { useAuth } from '@farmtech/auth';

export const AuthRoutes = ({ redirectPath = '/dashboard', children }: any) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    notifications.show({
      title: 'Already logged in',
      message: 'You are already logged in.',
      color: 'red',
    });
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};
