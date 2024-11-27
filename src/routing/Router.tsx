import { createBrowserRouter, RouterProvider } from 'react-router-dom';
//pages
import {
  ForgotPasswordPage,
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
  VerifyEmailPage,
} from '@farmtech/auth';
import { AboutUsPage, BlogViewPage, ContactUsPage, HomePage, NewsViewAllPage, NewsViewPage, ProfilePage, RegisterFarmlandAndSoilPage } from '@farmtech/entry';
import { PAGE_URL } from '@farmtech/shared';
import { RootBoundary } from '@farmtech/shared/pages/ErrorBoundary';
import { AuthRoutes } from './AuthRoutes';

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
        path: 'blog/:id',
        element: <BlogViewPage />,
      },
      {
        path: 'news/:id',
        element: <NewsViewPage />,
      },
      {
        path: 'news',
        element: <NewsViewAllPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: '/register-land-soil',
        element: <RegisterFarmlandAndSoilPage />,

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
            path: `/verify-email/:id`,
            element: <VerifyEmailPage />,
          },
        ],
      },

      // {
      //   path: PAGE_URL.DASHBOARD,
      //   element: <PrivateRoutes />,
      //   children: [
      //     {
      //       path: PAGE_URL.ADMIN,
      //       element: <AdminRoutes />,
      //       children: [
      //         //page not found
      //         {
      //           path: '*',
      //           element: <PageNotFound />,
      //         },
      //       ],
      //     },
      //   ],
      // },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
