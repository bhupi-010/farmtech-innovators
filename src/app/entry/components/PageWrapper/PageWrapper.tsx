import { Center, Container, Group, Text, Title } from '@mantine/core';
import classes from './PageWrapper.module.css';
import React from 'react';

type Props = {
  children: React.ReactNode;
  title: string;
  description?: string;
};

export const PageWrapper = ({ children, title, description }: Props) => {
  return (
    <div className={classes.wrapper}>
      <Container size="lg" py="xl">
        <Title order={2} className={classes.title} ta="center" mt="sm">
          {title}
        </Title>

        <Center>
          <Text c="dimmed" className={classes.description} ta="center" mt="md">
            {description}
          </Text>
        </Center>
        <Group mb="50"></Group>
        {children}
      </Container>
    </div>
  );
};
