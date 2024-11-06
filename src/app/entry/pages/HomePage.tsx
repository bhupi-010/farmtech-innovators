import { useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';

import { useLocalStorage } from '@farmtech/shared';

import { Hero } from '../components/Hero';
import { DefaultLayout } from '../layout/DefaultLayout';

export const HomePage = () => {
  return (
    <DefaultLayout>
      <Hero />
    </DefaultLayout>
  );
};
