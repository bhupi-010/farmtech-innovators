import { Container, Paper } from '@mantine/core';
import React, { ReactNode, HTMLProps } from 'react';

interface PaperWrapperProps extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
}

export const PaperWrapper: React.FC<PaperWrapperProps> = ({ children }) => (
  <Paper p="xl" mt="lg">
    {children}
  </Paper>
);

