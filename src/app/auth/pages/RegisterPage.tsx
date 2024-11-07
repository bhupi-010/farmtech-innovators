//modules
import { Text } from '@mantine/core';
import { Link } from 'react-router-dom';

import { AuthLayout } from '../layout';
import { RegisterForm } from '../components';

export const RegisterPage = () => (
  <AuthLayout pageTitle="Create a New Account" type="register">
    <RegisterForm />
    <Text ta="center" mt="md">
      Already have an account? <Link to="/login">Login</Link>
    </Text>
  </AuthLayout>
);
