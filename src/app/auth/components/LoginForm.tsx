import { Anchor, Checkbox, Group, PasswordInput, rem, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { Link, useNavigate } from 'react-router-dom';

import { AuthenticationButton } from './AuthenticationButton';
import { useAuth, useLogin } from '../hooks';
import { IconAt } from '@tabler/icons-react';
import { Login, LoginSchema } from '../schema';
import { useLocalStorage } from '@farmtech/shared';
export const LoginForm = () => {
  const { login } = useAuth();
  const [user, setStoredUser] = useLocalStorage('user', null);
  const { mutate, isPending } = useLogin();
  const navigate = useNavigate();

  const form = useForm<Login>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: yupResolver(LoginSchema),
  });

  const handleSubmit = (values: Login) => {
    const { email, password } = values;

    mutate(
      { email, password },
      {
        onSuccess: (data: any) => {
          const user = {
            id: data?.data?.data?.id,
            email: data?.data?.data?.email,
            firstName: data?.data?.data?.firstName,
            lastName: data?.data?.data?.lastName,
          };
          login(data?.data?.data?.tokens?.access, data?.data?.data?.tokens?.refresh);
          setStoredUser(data?.data?.data);
          if (data?.data?.data?.isEmailVerified === false) {
            navigate('/verify-email/' + data?.data?.data?.id);
            return;
          }

          notifications.show({
            color: 'teal',
            title: 'Logged in successfully',
            message: 'Logged in successfully',
          });
          navigate('/');
        },
        onError: (err: any) => {
          notifications.show({
            color: 'red',
            title: 'Error',
            message: err?.message ? err?.message : 'Failed to login! Please try again later',
          });
        },
      }
    );
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <TextInput
        label="Email"
        placeholder="Enter email"
        size="md"
        withAsterisk
        mt="md"
        {...form.getInputProps('email')}
        rightSection={<IconAt style={{ height: rem(17), width: rem(17) }} />}
      />
      <PasswordInput
        label="Password"
        placeholder="Your password"
        mt="md"
        size="md"
        withAsterisk
        {...form.getInputProps('password')}
      />
      <Group justify="space-between" mt="lg">
        <Checkbox label="Remember me" />
        <Anchor size="sm">
          <Link to="/forgot-password">Forgot password?</Link>
        </Anchor>
      </Group>
      <AuthenticationButton title="Login" isLoading={isPending} />
    </form>
  );
};
