import React, { useEffect } from 'react';

import { AuthLayout } from '../layout';
import { ResetPasswordForm } from '../components';
import { useClearLocalStorage } from '@farmtech/shared';

export const ResetPasswordPage = () => {
  const clearLocalStorage = useClearLocalStorage();

  useEffect(() => {
    clearLocalStorage();
  }, []);
  return (
    <AuthLayout pageTitle="Reset your password?" type="register">
      <ResetPasswordForm />
    </AuthLayout>
  );
};
