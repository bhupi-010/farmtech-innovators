import React, { useEffect, useState } from 'react';
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
  Card,
  Image,
} from '@mantine/core';
import { IconArrowUpRight } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
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
  const [news, setNews] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState('agriculture');

  const getNews = async (query: string) => {
    const data = await axios
      .get(
        `https://newsapi.org/v2/everything?q=${query}&sortBy=relevancy&apiKey=d534d41f03594af9aae1353b98e77426&pageSize=3`
      )
      .then((response) => response.data);
    setNews(data);
  };

  useEffect(() => {
    getNews(searchQuery);
  }, [searchQuery]);

  return (
    <Paper shadow="none" my={100}>
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
            {news?.articles?.map((news: any, index: number) => (
              <Card
                shadow="sm"
                p="lg"
                radius="md"
                style={{ backgroundColor: theme.colors.gray[1] }}
              >
                <Text size="sm" color="dimmed" mt="sm">
                  {news.source.name} • {new Date(news.publishedAt).toLocaleDateString()}
                </Text>
                <Text fw={700} size="lg" mt="xs">
                  {news.title}
                </Text>
                <Text size="sm" color="dimmed" mt="xs">
                  {news.description}
                </Text>

                {news.author && (
                  <Text size="xs" color="dimmed" mt="sm">
                    Author: {news.author}
                  </Text>
                )}

                <Group justify="apart" mt="lg">
                  <Link to={news.url} target="_blank" rel="noopener noreferrer">
                    <Button
                      rightSection={<IconArrowUpRight size={16} />}
                      variant="light"
                      color="primary"
                    >
                      Read More
                    </Button>
                  </Link>
                </Group>
              </Card>
            ))}
          </Stack>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};
