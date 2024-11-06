import React from 'react';

import { AuthLayout } from '../layout';
import { ForgotPasswordForm } from '../components';

export const ForgotPasswordPage = () => (
  <AuthLayout pageTitle="Forgot your password?">
    <ForgotPasswordForm />
  </AuthLayout>
);
