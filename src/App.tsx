//modules
import { createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import '../src/app/localization';
//components
import { AuthProvider } from '@farmtech/auth';
//routing
import { Router } from './routing/Router';
//styling of modules
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';
import './App.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      // suspense: true,
      retry: false,
    },
  },
});

const RouterWithTheme = () => {
  const primaryColor = '#668422';
  const secondaryColor = '#ffcb0a';

  const theme = createTheme({
    primaryColor: 'primary',
    colors: {
      primary: [
        primaryColor,
        primaryColor,
        primaryColor,
        primaryColor,
        primaryColor,
        primaryColor,
        primaryColor,
        primaryColor,
        primaryColor,
        primaryColor,
      ],
      secondary: [
        secondaryColor,
        secondaryColor,
        secondaryColor,
        secondaryColor,
        secondaryColor,
        secondaryColor,
        secondaryColor,
        secondaryColor,
        secondaryColor,
        secondaryColor,
      ],
    },
    components: {
      Modal: {
        styles: (theme: any) => ({
          title: {
            fontWeight: 700,
            fontSize: theme.fontSizes.md,
          },
        }),
      },
    },
  });

  return (
    <MantineProvider theme={theme}>
      <ModalsProvider>
        <Notifications position="top-right" />
        <Router />
      </ModalsProvider>
    </MantineProvider>
  );
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterWithTheme />
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthProvider>
    </QueryClientProvider>
  );
}
