import React from 'react';
import { Container, Grid, Card, Image, Text, Group, Button, Paper, Stack, Divider, useMantineTheme, ThemeIcon } from '@mantine/core';
import { DefaultLayout } from '../layout/DefaultLayout';
import { Link } from 'react-router-dom';
import { IconArrowUpRight } from '@tabler/icons-react';

const newsItems = [
  {
    id: 1,
    category: 'Tech',
    date: 'November 2024',
    title: 'Breaking: New AI tool revolutionizes web development',
    link: '/news/1',
  },
  {
    id: 2,
    category: 'Health',
    date: 'November 2024',
    title: 'Advancements in gene therapy open doors to new treatments',
    link: '/news/2',
  },
  {
    id: 3,
    category: 'Finance',
    date: 'November 2024',
    title: 'Stock market sees record highs amid economic growth',
    link: '/news/3',
  },
  {
    id: 4,
    category: 'Tech',
    date: 'November 2024',
    title: 'New AI tool revolutionizes web development',
    link: '/news/4',
  },
  {
    id: 5,
    category: 'Health',
    date: 'November 2024',
    title: 'Advancements in gene therapy open doors to new treatments',
    link: '/news/5',
  },
  {
    id: 6,
    category: 'Finance',
    date: 'November 2024',
    title: 'Stock market sees record highs amid economic growth',
    link: '/news/6',
  },
];

export const NewsViewAllPage = () => {
  const theme = useMantineTheme();
  return (
    <DefaultLayout>
    
        <Paper shadow="none" my={"xl"} >
          <Stack align="center" mb="lg">
            <Text fw={700} ta="center" size="36px" style={{ color: '#333' }}>
              Latest News
            </Text>
            <Text c="dimmed" ta="center">
              Stay updated with the latest articles from various categories
            </Text>
          </Stack>

          <Grid>
            {newsItems.map((news) => (
              <Grid.Col span={{ base: 12, md: 6 }} key={news.id}>
              <Paper
                key={news.id}
                shadow="none"
                p="lg"
                radius="md"
                style={{ backgroundColor: theme.colors.gray[1] }}
              >
                <Group justify="apart" gap="xs">
                  <Group>
                    <Text
                      size="xs"
                      c="primary"
                      style={{ textTransform: 'uppercase', fontWeight: 700 }}
                    >
                      {news.category}
                    </Text>
                    <Text
                      size="lg"
                      c="dimmed"
                      style={{ textTransform: 'uppercase', fontWeight: 700 }}
                    >
                      •
                    </Text>
                    <Text
                      size="xs"
                      c="dimmed"
                      style={{ textTransform: 'uppercase', fontWeight: 700 }}
                    >
                      {news.date}
                    </Text>
                  </Group>
                </Group>
                <Group justify="apart" align="center" mt="xs">
                  <Text fw={700} size="md">
                    {news.title}
                  </Text>
                  <Link to={news.link}>
                    <ThemeIcon variant="transparent" color="primary">
                      <IconArrowUpRight size={30} />
                    </ThemeIcon>
                  </Link>
                </Group>
              </Paper>
              </Grid.Col>
            ))}
          </Grid>
        </Paper>
    </DefaultLayout>
  );
};
