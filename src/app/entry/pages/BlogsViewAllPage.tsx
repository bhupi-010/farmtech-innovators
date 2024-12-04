import React, { useState } from 'react';
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
import { useGetBlogs } from '../hooks';
import { useAuth} from "@farmtech/auth";

export const BlogsViewAllPage = () => {
  const theme = useMantineTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const { data: blogs, isLoading: isLoadingBlogs } = useGetBlogs(searchQuery);
  const { isAuthenticated} = useAuth();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <DefaultLayout>
      <Paper shadow="none" my="xl">
        <Stack align="center" mb="lg">
          <Text fw={700} ta="center" size="36px" style={{ color: '#333' }}>
            Latest Blogs
          </Text>
          <Text c="dimmed" ta="center">
            Stay updated with the latest blogs from various categories
          </Text>
        </Stack>

        <Container mb="lg">
          <Group justify="center">
            <TextInput
              leftSection={<IconSearch size={16} />}
              placeholder="Search blogs..."
              miw={300}
              value={searchQuery}
              onChange={handleSearch}
              radius="md"
            />
            {isAuthenticated && ( // Conditionally render the Add Blog button based on authentication
                <Link to="/blogs/add">
                  <Button leftSection={<IconArrowUpRight />} radius="md" size="sm">
                    Add Blog
                  </Button>
                </Link>
            )}
          </Group>
        </Container>

        <Grid>
          {blogs?.data?.results?.slice(0, 3).map((blog: any, index: number) => (
            <Grid.Col span={{ base: 12, md: 4 }} key={index}>
              <Card
                shadow="sm"
                p="lg"
                radius="md"
                style={{ backgroundColor: theme.colors.gray[1] }}
              >
                {blog.imageUrl ? (
                  <Image
                    src={blog.imageUrl}
                    style={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      borderRadius: theme.radius.md,
                      display: 'block',
                    }}
                    alt={blog.title}
                  />
                ) : (
                  <Paper p="xs" style={{ height: 180 }} />
                )}

                <Text size="sm" color="dimmed" mt="sm">
                  {blog.author} • {new Date(blog.createdAt).toLocaleDateString()}
                </Text>
                <Text fw={700} size="lg" mt="xs">
                  {blog.title}
                </Text>
                <Text size="sm" color="dimmed" mt="xs">
                  {blog.content.length > 100 ? `${blog.content.slice(0, 100)}...` : blog.content}
                </Text>

                <Text size="sm" color="dimmed" mt="sm">
                  Category: {blog.category.name}
                </Text>
                <Text size="xs" color="dimmed" mt="xs">
                  Tags: {blog.tags.map((tag: any) => tag.name).join(', ')}
                </Text>

                <Group justify="apart" mt="lg">
                  <Link to={`/blogs/${blog.id}`}>
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
