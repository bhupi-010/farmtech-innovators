import React from 'react';

import { AuthLayout } from '../layout';
import { VerifyEmailForm } from '../components';

export const VerifyEmailPage = () => (
  <AuthLayout pageTitle="Verify Email">
    <VerifyEmailForm />
  </AuthLayout>
);
