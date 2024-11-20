import React from 'react';
import {
  Container,
  Grid,
  Text,
  Button,
  Group,
  Paper,
  Stack,
  ThemeIcon,
  useMantineTheme,
} from '@mantine/core';
import { IconArrowUpRight } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
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
];

export const NewsSection = () => {
  const theme = useMantineTheme();

  return (
    <Paper shadow="none">
      <Grid align="center" justify="space-between">
        <Grid.Col span={6}>
          <Text fw={700} size="36px" c="black" mb="md">
            Latest News
          </Text>
          <Text c="dimmed" mb="lg">
            Stay updated with the most recent developments in technology, health, finance, and more.
          </Text>
          <Link to="/news">
          <Button
            radius="xl"
            gradient={{ from: 'primary', to: 'secondary' }}
            variant="gradient"
            size="md"
          >
            View All News
          </Button>
          </Link>
        </Grid.Col>
        <Grid.Col span={6}>
          <Stack gap="lg">
            {newsItems.map((news) => (
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
            ))}
          </Stack>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};
