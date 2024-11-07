import { Button, Container, Group, Text, Title } from '@mantine/core';
import classes from './error.module.css';

export const ErrorPage = () => {
  return (
    <Container className={classes.root}>
      <div className={classes.label}>403</div>
      <Title className={classes.title}>You have found a secret place.</Title>
      <Group justify="center">
        <Text c="dimmed" size="lg" ta="center" className={classes.description}>
          Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has
          been moved to another URL.
        </Text>
      </Group>
      <Group justify="center">
        <Button variant="subtle" size="md">
          Take me back to home page
        </Button>
      </Group>
    </Container>
  );
};
