import React, { useEffect } from 'react';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer';
import classes from './Layout.module.css';
import { useWindowScroll } from '@mantine/hooks';
import { Container } from '@mantine/core';

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
      <Container size={'xl'} py={"md"}>{children}</Container>
      <Footer />
    </>
  );
};
