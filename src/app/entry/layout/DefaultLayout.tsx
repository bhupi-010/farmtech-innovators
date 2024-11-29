import React, { useEffect } from 'react';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer';
import { useWindowScroll } from '@mantine/hooks';
import { Container, Paper } from '@mantine/core';

type Props = {
  children: React.ReactNode;
};

export const DefaultLayout = ({ children }: Props) => {
  const [_, scrollTo] = useWindowScroll();

  useEffect(() => {
    scrollTo({ x: 0, y: 0 });
  }, []);

  return (
    <>
      <Header />
      <Paper px={'xl'}mih={'80vh'} py={'md'}>
        {children}
      </Paper>
      <Footer />
    </>
  );
};
