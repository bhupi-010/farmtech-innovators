import { rem, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';

import { AuthenticationButton } from './AuthenticationButton';
import { useForgotPassword } from '../hooks';
import { notifications } from '@mantine/notifications';
import { IconAt } from '@tabler/icons-react';
import { ForgotPasswordSchema } from '../schema';

export const ForgotPasswordForm = () => {
  const mutation = useForgotPassword();
  const form = useForm({
    initialValues: {
      email: '',
    },
    validate: yupResolver(ForgotPasswordSchema),
  });

  const handleSubmit = (values: { email: string }) => {
    mutation.mutate(values, {
      onSuccess: (data) => {
        notifications.show({
          color: 'green',
          title: 'Success! Password Reset Email Sent',
          message: `An email containing the password reset link has been sent to your inbox. Please check your email and follow the instructions to reset your password.`,
        });
        form.reset();
      },
      onError: (err: any) => {
        notifications.show({
          color: 'red',
          title: 'Error',
          message: err?.message ?? 'Error sending email. Please try again later.',
        });
      },
    });
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
      <AuthenticationButton title="Continue to Reset Password" isLoading={mutation.isPending} />
    </form>
  );
};
