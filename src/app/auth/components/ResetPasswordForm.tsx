import { useNavigate, useParams } from 'react-router-dom';
import { PasswordInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';

import { PasswordInputField } from '@farmtech/shared';
import { AuthenticationButton } from './AuthenticationButton';
import { useResetPassword } from '../hooks';
import { ResetPassword, ResetPasswordSchema } from '../schema';

export const ResetPasswordForm = () => {
  const params = useParams();
  const token = params.token;
  const navigate = useNavigate();
  const mutation = useResetPassword();
  const form = useForm({
    initialValues: {
      password: '',
      confirmPassword: '',
      token: token,
    },
    validate: yupResolver(ResetPasswordSchema),
  });

  const handleSubmit = (values: ResetPassword) => {
    mutation.mutate(values, {
      onSuccess: (data) => {
        notifications.show({
          color: 'green',
          title: 'Success',
          message: 'Password reset successfully. Please login with your new password.',
        });
        navigate('/login');
      },
      onError: (err: any) => {
        notifications.show({
          color: 'red',
          title: 'Error',
          message: err?.message ?? 'Failed to reset password! Please try again later',
        });
      },
    });
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <PasswordInputField form={form} />
      <PasswordInput
        label="Confirm New Password"
        placeholder="Confirm New Password"
        size="md"
        withAsterisk
        my="md"
        {...form.getInputProps('confirmPassword')}
      />
      <AuthenticationButton title="Reset Password" isLoading={mutation.isPending} />
    </form>
  );
};
