import { Navigate, Outlet } from 'react-router-dom';
import { notifications } from '@mantine/notifications';

import { useAuth } from '@farmtech/auth';

export const PrivateRoutes = ({ redirectPath = '/login', children }: any) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    notifications.show({
      color: 'red',
      title: 'User session',
      message:
        'Your user session has either been refreshed or has expired. Please log in again if needed.',
    });
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
