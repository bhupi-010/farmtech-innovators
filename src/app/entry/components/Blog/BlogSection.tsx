import React, { useState } from 'react';
import {
  Grid,
  Card,
  Image,
  Text,
  Button,
  Group,
  Paper,
  Stack,
  useMantineTheme,
} from '@mantine/core';
import { useGetBlogs } from '@farmtech/entry/hooks';
import { Link } from 'react-router-dom';
import { IconArrowUpRight } from '@tabler/icons-react';
import classes from './BlogSection.module.css';

const truncateText = (text: string, length: number) => {
  return text.length > length ? `${text.slice(0, length)}...` : text;
};

export const BlogSection = () => {
  const theme = useMantineTheme();
  const [searchQuery, setSearchQuery] = useState('agriculture');
  const { data: blogs, isLoading: isLoadingBlogs } = useGetBlogs(searchQuery);

  // Mock data (ensure id is string)
  const mockBlogs = [
    {
      id: '1',
      image:
          'https://thumbs.dreamstime.com/b/blogging-blog-concepts-ideas-worktable-blogging-blog-concepts-ideas-white-worktable-110423482.jpg?w=768',
      title: 'Blog Title 1',
      summary:
          'This is a summary of blog 1. It is a longer text that we will truncate. It should be shortened as well.',
      author: 'Author 1',
      link: '/blog/1',
    },
    {
      id: '2',
      image:
          'https://thumbs.dreamstime.com/b/blogging-blog-concepts-ideas-worktable-blogging-blog-concepts-ideas-white-worktable-110423482.jpg?w=768',
      title: 'Blog Title 2',
      summary:
          'This is a summary of blog 2. It should be shortened as well. It is a longer text that we will truncate.',
      author: 'Author 2',
      link: '/blog/2',
    },
    {
      id: '3',
      image:
          'https://thumbs.dreamstime.com/b/blogging-blog-concepts-ideas-worktable-blogging-blog-concepts-ideas-white-worktable-110423482.jpg?w=768',
      title: 'Blog Title 3',
      summary:
          'This is a summary of blog 3. It should be shortened as well. It is a longer text that we will truncate.',
      author: 'Author 3',
      link: '/blog/3',
    },
    {
      id: '4',
      image:
          'https://thumbs.dreamstime.com/b/blogging-blog-concepts-ideas-worktable-blogging-blog-concepts-ideas-white-worktable-110423482.jpg?w=768',
      title: 'Small Blog Title',
      summary:
          'This is a brief summary of a smaller blog post that should be shortened as well. It is a longer text that we will truncate.',
      author: 'Author 4',
      link: '/blog/4',
    },
  ];

  // If blogs data is loading, show loading state
  if (isLoadingBlogs) {
    return (
        <Paper shadow="none" my={100}>
          <Stack gap="sm" align="center" my="xl">
            <Text fw={700} ta="center" size="30px">
              Loading Blogs...
            </Text>
          </Stack>
        </Paper>
    );
  }

  return (
      <Paper shadow="none" my={100}>
        <Stack gap="sm" align="center" my="xl">
          <Text fw={700} ta="center" size="30px">
            Our Blogs
          </Text>
          <Text color="dimmed" ta="center">
            Check out our latest blog posts
          </Text>
        </Stack>
        <Grid>
          {(blogs?.data?.results || mockBlogs).map((blog: any, index: number) => (
              <Grid.Col span={{ base: 12, md: 4 }} key={blog.id}>
                <Card shadow="sm" p="lg" radius="md" style={{ backgroundColor: theme.colors.gray[1] }}>
                  {blog.imageUrl ? (
                      <Image src={blog.imageUrl} alt={blog.title} className={classes.image} />
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
                    {truncateText(blog.content || blog.summary, 100)}
                  </Text>

                  <Text size="sm" color="dimmed" mt="sm">
                    Category: {blog.category?.name || 'N/A'}
                  </Text>
                  <Text size="xs" color="dimmed" mt="xs">
                    Tags: {blog.tags?.map((tag: any) => tag.name).join(', ') || 'N/A'}
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
  );
};
