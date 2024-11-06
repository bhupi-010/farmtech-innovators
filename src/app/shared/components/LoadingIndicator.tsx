import { Group, Loader } from '@mantine/core';

export const LoadingIndicator = ({ ...props }: any) => (
  <Group justify="center" align="center" h="50vh" {...props}>
    <Loader type="bars" size='sm' />
  </Group>
);
