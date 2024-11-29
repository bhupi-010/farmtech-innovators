import React from 'react';
import { Container, Image, Text, Paper, Stack, Group, Divider, Button } from '@mantine/core';
import { DefaultLayout } from '../layout/DefaultLayout';
import { AddBlog } from '../components/Blog';

export const AddBlogPage = () => {
  return (
    <DefaultLayout>
      <Container size="md">
      <AddBlog />
      </Container>
    </DefaultLayout>
  );
};
