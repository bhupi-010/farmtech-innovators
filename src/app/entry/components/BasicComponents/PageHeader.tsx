import React from 'react';
import { Text, Card, Paper, Container, useMantineTheme } from '@mantine/core';
import { useMantineColorScheme } from '@mantine/core';
type PageHeaderProps = {
  title: string;
  subTitle?: string;
  mx?: string;
};

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subTitle, mx }) => {
  const theme = useMantineTheme();
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  return (
    <div>
      <div>
        <Text c={colorScheme === 'dark' ? 'white' : 'black'} fw={700} size="lg">
          {title}
        </Text>
      </div>
      {subTitle && (
        <div>
          <Text c={colorScheme === 'dark' ? 'white' : 'dimmed'} fw={400} size="xs">{subTitle}</Text>
        </div>
      )}
    </div>
  );
};
