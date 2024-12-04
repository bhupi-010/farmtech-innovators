import { Text } from '@mantine/core';
import { Link } from 'react-router-dom';

import { LoginForm } from '../components/LoginForm';

import { AuthLayout } from '../layout';
import GoogleAuthButton from "@farmtech/auth/components/GoogleAuthButton";

export const LoginPage = () => (
  <AuthLayout pageTitle="Login">
    <LoginForm />
      <GoogleAuthButton></GoogleAuthButton>
    <Text ta="center" mt="md">
      Don&apos;t have an account? <Link to="/register">Register</Link>
    </Text>
  </AuthLayout>
);
