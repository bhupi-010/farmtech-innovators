import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Card,
  Image,
  Text,
  Group,
  Button,
  Paper,
  Stack,
  Divider,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import { DefaultLayout } from '../layout/DefaultLayout';
import { Link } from 'react-router-dom';
import { IconArrowUpRight, IconSearch } from '@tabler/icons-react';
import axios from 'axios';

export const NewsViewAllPage = () => {
  const theme = useMantineTheme();
  const [news, setNews] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState('agriculture');

  const getNews = async (query: string) => {
    const data = await axios
      .get(
        `https://newsapi.org/v2/everything?q=${query}&sortBy=relevancy&apiKey=d534d41f03594af9aae1353b98e77426&pageSize=10`
      )
      .then((response) => response.data);
    setNews(data);
  };

  useEffect(() => {
    getNews(searchQuery);
  }, [searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <DefaultLayout>
      <Paper shadow="none" my="xl">
        <Stack align="center" mb="lg">
          <Text fw={700} ta="center" size="36px" style={{ color: '#333' }}>
            Latest News
          </Text>
          <Text c="dimmed" ta="center">
            Stay updated with the latest articles from various categories
          </Text>
        </Stack>

        <Container mb="lg">
          <TextInput
            leftSection={<IconSearch size={16} />}
            placeholder="Search news..."
            value={searchQuery}
            onChange={handleSearch}
            radius="md"
          />
        </Container>

        <Grid>
          {news?.articles?.map((news: any, index: number) => (
            <Grid.Col span={{ base: 12, md: 6 }} key={index}>
              <Card
                shadow="sm"
                p="lg"
                radius="md"
                style={{ backgroundColor: theme.colors.gray[1] }}
              >
                <Image src={news.urlToImage} alt={news.title} height={180} />
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
            </Grid.Col>
          ))}
        </Grid>
      </Paper>
    </DefaultLayout>
  );
};
