import { Button } from '@mantine/core';

type Props = {
  title: string;
  isLoading: boolean;
};

export const AuthenticationButton = (props: Props) => (
  <Button fullWidth mt="xl" size="md" type="submit" loading={props.isLoading} disabled={props.isLoading}>
    {props.title}
  </Button>
);
