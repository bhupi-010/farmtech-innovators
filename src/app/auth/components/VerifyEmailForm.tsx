import { Group, Loader, NumberInput, UnstyledButton } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useNavigate, useParams } from 'react-router-dom';

import { AuthenticationButton } from './AuthenticationButton';
import { useAuth, useEmailResendOtp, useVerifyEmail } from '../hooks';

export const VerifyEmailForm = () => {
  const { login } = useAuth();
  const params = useParams();
  const id = params?.id;
  const { mutate, isPending } = useVerifyEmail();
  const resendOtpMutation = useEmailResendOtp();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      otp: '',
    },
    validate: {
      otp: (val) => (val.length <= 6 ? 'Otp is required' : null),
    },
  });
  const handleSubmit = (values: any) => {
    const { otp } = values;

    mutate(
      { otp },
      {
        onSuccess: (data: any) => {
          // const user = {
          //   id: data?.data?.data?.id,
          //   email: data?.data?.data?.email,
          //   firstName: data?.data?.data?.firstName,
          //   lastName: data?.data?.data?.lastName,
          // };
          // login(data?.data?.data?.tokens?.access, data?.data?.data?.tokens?.refresh, user);
          navigate('/');
          notifications.show({
            color: 'teal',
            title: 'Email verified successfully',
            message: 'Email verified successfully',
          });
        },
        onError: (err: any) => {
          notifications.show({
            color: 'red',
            title: 'Error',
            message: err.message ?? 'Otp verification error',
          });
        },
      }
    );
  };
  const handleResetOtp = () => {
    resendOtpMutation.mutate(id, {
      onSuccess: () => {
        notifications.show({
          color: 'teal',
          title: 'Otp re-send',
          message: 'Otp re-send successfully',
        });
      },
      onError: (err: any) => {
        notifications.show({
          color: 'red',
          title: 'Error',
          message: err.message || 'Failed to send otp!!',
        });
      },
    });
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <NumberInput
        label="Otp"
        placeholder="Your otp"
        size="md"
        withAsterisk
        mb="md"
        {...form.getInputProps('otp')}
      />
      <Group justify="flex-end" mt="lg">
        <UnstyledButton onClick={handleResetOtp} size="sm" disabled={resendOtpMutation.isPending}>
          {resendOtpMutation.isPending ? <Loader size={16} /> : null} Resend Otp?
        </UnstyledButton>
      </Group>
      <AuthenticationButton title="Verify Email" isLoading={isPending} />
    </form>
  );
};
