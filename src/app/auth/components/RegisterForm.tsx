import { Anchor, Checkbox, Group, PasswordInput, rem, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { Link, useNavigate } from 'react-router-dom';

import { AuthenticationButton } from './AuthenticationButton';
import { useAuth, useRegister } from '../hooks';
import { IconAt } from '@tabler/icons-react';
import { SignUp, SignUpSchema } from '../schema';

export const RegisterForm = () => {
  const { mutate, isPending } = useRegister();
  const navigate = useNavigate();

  const form = useForm<SignUp>({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
    },
    validate: yupResolver(SignUpSchema),
  });

  const handleSubmit = (values: SignUp) => {
    const { email, password, confirmPassword, firstName, lastName } = values;
    mutate(
      { email, password, confirmPassword, firstName, lastName },
      {
        onSuccess: (data: any) => {
          notifications.show({
            color: 'teal',
            title: ' User registered successfully',
            message: 'User registered successfully',
          });
          navigate('/login');
        },
        onError: (err: any) => {
          notifications.show({
            color: 'red',
            title: 'Error',
            message: err?.message ? err?.message : 'Failed to register! Please try again later',
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
      <PasswordInput
        label="Confirm Password"
        placeholder="Your password"
        mt="md"
        size="md"
        withAsterisk
        {...form.getInputProps('confirmPassword')}
      />

      <TextInput
        label="First Name"
        placeholder="Enter first name"
        mt="md"
        size="md"
        withAsterisk
        {...form.getInputProps('firstName')}
      />

      <TextInput
        label="Last Name"
        placeholder="Enter last name"
        mt="md"
        size="md"
        withAsterisk
        {...form.getInputProps('lastName')}
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
