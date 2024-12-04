import { createBrowserRouter, RouterProvider } from 'react-router-dom';
//pages
import {
  ForgotPasswordPage,
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
  VerifyEmailPage,
} from '@farmtech/auth';
import {
  AboutUsPage,
  AddBlogPage,
  BlogsViewAllPage,
  BlogViewPage,
  ContactUsPage,
  HomePage,
  NewsViewAllPage,
  NewsViewPage,
  ProfilePage,
  PublicFarmlandPage,
  RegisterFarmlandAndSoilPage,
  SubscriptionPage,
} from '@farmtech/entry';
import { PAGE_URL } from '@farmtech/shared';
import { RootBoundary } from '@farmtech/shared/pages/ErrorBoundary';
import { AuthRoutes } from './AuthRoutes';
import { PrivateRoutes } from './PrivateRoutes';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <RootBoundary />,
    children: [
      {
        path: PAGE_URL.HOME,
        element: <HomePage />,
      },
      {
        path: PAGE_URL.CONTACTUS,
        element: <ContactUsPage />,
      },
      {
        path: PAGE_URL.ABOUTUS,
        element: <AboutUsPage />,
      },
      {
        path: '/blogs/:id',
        element: <BlogViewPage />,
      },
      {
        path: '/news/:id',
        element: <NewsViewPage />,
      },
      {
        path: '/news',
        element: <NewsViewAllPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },

      {
        path: `/verify-email/:id`,
        element: <VerifyEmailPage />,
      },
      {
        path: '/subscription',
        element: <SubscriptionPage />,
      },
      {
        path: '/blogs/add',
        element: <AddBlogPage />,
      },
      {
        path: '/blogs',
        element: <BlogsViewAllPage />,
      },

      {
        path: '',
        element: <AuthRoutes />,
        children: [
          {
            path: PAGE_URL.LOGIN,
            element: <LoginPage />,
          },
          {
            path: PAGE_URL.REGISTER,
            element: <RegisterPage />,
          },
          {
            path: PAGE_URL.FORGOT_PASSWORD,
            element: <ForgotPasswordPage />,
          },
          {
            path: `${PAGE_URL.RESET_PASSWORD}/:token`,
            element: <ResetPasswordPage />,
          },
          {
            path: '/view-public-farmlands',
            element: <PublicFarmlandPage />,
          },
        ],
      },

      {
        path: '',
        element: <PrivateRoutes />,
        children: [
          {
            path: '/register-land-soil',
            element: <RegisterFarmlandAndSoilPage />,
          },
        ],
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
