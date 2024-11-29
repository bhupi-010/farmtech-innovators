import { useContext } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AuthContext } from '@farmtech/auth';
import { apiClient } from '@farmtech/shared';
import { ResetPassword } from '../schema';

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) =>
      await apiClient.post('/user/login/', {
        email,
        password,
      }),
  });
};

const register = async ({
  email,
  password,
  confirmPassword,
  firstName,
  lastName,
  mobileNumber,
}: any) => {
  return await apiClient.post('/user/register/', {
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    mobileNumber,
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      return await apiClient.post('/forgot-password', {
        email,
      });
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async ({ password, confirmPassword, token }: ResetPassword) => {
      return await apiClient.post('/reset-password', {
        password,
        confirmPassword,
        token,
      });
    },
  });
};

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: async ({ otp }: { otp: string }) => {
      return await apiClient.post(`/user-verification/verify-email-otp/`, {
        otp: String(otp),
      });
    },
  });
};


export const useLoginByOtp = () => {
  return useMutation({
    mutationFn: async ({ boid, otp }: any) => {
      return await apiClient.post('/otp-login', {
        boid,
        otp,
      });
    },
  });
};

export const useEmailResendOtp = () => {
  return useMutation({
    mutationFn: async (userId: any) => {
      return await apiClient.post('/user-verification/send-email-otp/');
    },
  });
};

export const useResendOtp = (boid: string) => {
  const query = useQuery({
    queryKey: ['resend-otp', boid],
    queryFn: () => {
      return apiClient.get(`/users/${boid}/get-otp`);
    },
    enabled: false,
    retry: false,
  });
  return { ...query, isPending: query.isPending && query.fetchStatus !== 'idle' };
};
