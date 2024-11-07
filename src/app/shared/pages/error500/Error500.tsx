import { Button, Center, Container, Group, Stack, Text, Title } from '@mantine/core';
import classes from './ServerError.module.css';
import { useNavigate } from 'react-router-dom';

type Props = {
  title?: string;
  image?: string;
  description?: string;
};

export function Error500(props: Props) {
  const navigate = useNavigate();
  const { title = 'Something is not right..', description } = props;

  return (
    <Container className={classes.root}>
      {/* <Image src={image ?? Iconimage} className={classes.mobileImage} /> */}
      <Group justify="center">
        <Title c="red" fw={800} order={1} className={classes.title} mb="xs" size="250">
          500
        </Title>
      </Group>
      <Stack justify="center" align="center">
        <Title className={classes.title} mb="lg" c="red">
          {title}
        </Title>
        <Center>
          <Text c="dimmed" size="lg">
            {description ??
              `Our servers could not handle your request. Don't worry, our development team was already notified. Try refreshing the page. If you're still having problems, you can contact our support.`}
          </Text>
        </Center>
        <Button
          variant="outline"
          size="md"
          mt="xl"
          className={classes.control}
          onClick={() => navigate('/')}
        >
          Get back to home page
        </Button>
      </Stack>
    </Container>
  );
}
