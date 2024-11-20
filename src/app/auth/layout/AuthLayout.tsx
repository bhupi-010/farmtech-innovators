import React from 'react';
import { Box, Button, Group, Paper, Title } from '@mantine/core';

import classes from '../pages/Authentication.module.css';
import { Logo } from '@farmtech/shared';
import { IconHome } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
  pageTitle: string;
  type?: string;
};

export const AuthLayout = (props: Props) => {
  const { children, pageTitle, type } = props;
  return (
    <Box className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Group justify="start">
          <Link to="/">
            <Button leftSection={<IconHome size={15} />} variant="outline">
              Home
            </Button>
          </Link>
        </Group>
        <Group justify="center" h="100%">
          <Logo height={150} width={150} />
        </Group>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          {pageTitle}
        </Title>
        {children}
      </Paper>
    </Box>
  );
};
