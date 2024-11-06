import React from 'react';
import icon from './notfound.gif';
import { Flex, Image, Text } from '@mantine/core';

type Props = {
  message?: string;
};

export const NothingFound = (props: Props) => {
  const { message = 'No data found to show' } = props;
  return (
    <Flex justify="center" direction="column" align="center">
      <Image radius="md" src={icon} h={20} w={150} />
      <Text c="gray" size="sm">
        {message}
      </Text>
    </Flex>
  );
};
