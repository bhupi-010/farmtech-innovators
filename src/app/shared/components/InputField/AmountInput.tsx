import React from 'react';
import { NumberInput, Text } from '@mantine/core';

export const AmountInput = (props: any) => {
  return (
    <NumberInput
      min={0}
      allowNegative={false}
      clampBehavior="strict"
      leftSection={
        <Text size="sm" c="dark" fw={600}>
          Rs.
        </Text>
      }
      {...props}
      hideControls
    />
  );
};
