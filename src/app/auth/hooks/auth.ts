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
      await apiClient.post('/login', {
        email,
        password,
      }),
  });
};

const register = async ({ email, password, firstName, lastName, mobileNumber }: any) => {
  return await apiClient.post('/signup', {
    email,
    password,
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
    mutationFn: async ({ otp, id }: { otp: string; id: number }) => {
      return await apiClient.post(`/verify-email`, {
        otp: String(otp),
        userId: id,
      });
    },
  });
};

export const useProfile = () => {
  return useQuery({ queryKey: ['profile'], queryFn: async () => await apiClient.get('/me') });
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
    mutationFn: async (userId: number) => {
      return await apiClient.post('/resend-verification-otp', { userId });
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
