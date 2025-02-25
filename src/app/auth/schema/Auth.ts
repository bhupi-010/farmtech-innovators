import * as yup from 'yup';

export const ResetPasswordSchema = yup.object().shape({
  password: yup.string().required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
  token: yup.string().optional(),
});

export type ResetPassword = yup.InferType<typeof ResetPasswordSchema>;

export const LoginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  // userName : yup.string().required('User Name is required'),
  password: yup.string().required('Password is required'),
});
export type Login = yup.InferType<typeof LoginSchema>;

export const ForgotPasswordSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
});

export type ForgotPassword = yup.InferType<typeof ForgotPasswordSchema>;
