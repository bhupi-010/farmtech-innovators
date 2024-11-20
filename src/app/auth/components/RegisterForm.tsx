import { Anchor, Checkbox, Group, PasswordInput, rem, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { Link, useNavigate } from 'react-router-dom';

import { AuthenticationButton } from './AuthenticationButton';
import { useAuth, useRegister } from '../hooks';
import { IconAt } from '@tabler/icons-react';
import { Login, LoginSchema } from '../schema';

export const RegisterForm = () => {
  const { login } = useAuth();
  const { mutate, isPending } = useRegister();
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
          login(data?.data?.token);
          notifications.show({
            color: 'teal',
            title: 'Logged in successfully',
            message: 'Logged in successfully',
          });
          navigate('/dashboard');
        },
        onError: (err: any) => {
          if (err && err?.user?.id) {
            navigate('/verify-email/' + err.user.id);
            return;
          }
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
      <AuthenticationButton title="Register" isLoading={isPending} />
    </form>
  );
};
