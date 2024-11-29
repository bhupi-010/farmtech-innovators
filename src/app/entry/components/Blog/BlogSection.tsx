import React from 'react';
import {
  Grid,
  Card,
  Image,
  Text,
  Button,
  Group,
  Paper,
  Stack,
} from '@mantine/core';

const blogs = [
  {
    id: 1,
    image:
      'https://thumbs.dreamstime.com/b/blogging-blog-concepts-ideas-worktable-blogging-blog-concepts-ideas-white-worktable-110423482.jpg?w=768',
    title: 'Blog Title 1',
    summary:
      'This is a summary of blog 1. It is a longer text that we will truncate. It should be shortened as well.',
    author: 'Author 1',
    link: '/blog/1',
  },
  {
    id: 2,
    image:
      'https://thumbs.dreamstime.com/b/blogging-blog-concepts-ideas-worktable-blogging-blog-concepts-ideas-white-worktable-110423482.jpg?w=768',
    title: 'Blog Title 2',
    summary:
      'This is a summary of blog 2. It should be shortened as well. It is a longer text that we will truncate.',
    author: 'Author 2',
    link: '/blog/2',
  },
  {
    id: 3,
    image:
      'https://thumbs.dreamstime.com/b/blogging-blog-concepts-ideas-worktable-blogging-blog-concepts-ideas-white-worktable-110423482.jpg?w=768',
    title: 'Blog Title 3',
    summary:
      'This is a summary of blog 3. It should be shortened as well. It is a longer text that we will truncate.',
    author: 'Author 3',
    link: '/blog/3',
  },
  {
    id: 4,
    image:
      'https://thumbs.dreamstime.com/b/blogging-blog-concepts-ideas-worktable-blogging-blog-concepts-ideas-white-worktable-110423482.jpg?w=768',
    title: 'Small Blog Title',
    summary:
      'This is a brief summary of a smaller blog post that should be shortened as well. It is a longer text that we will truncate.',
    author: 'Author 4',
    link: '/blog/4',
  },
];

const truncateText = (text: string, length: number) => {
  return text.length > length ? `${text.slice(0, length)}...` : text;
};

export const BlogSection = () => {
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
      <Grid gutter="lg">

        {blogs.map((blog) => (
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={blog.id}>
            <Card shadow="sm" radius="md" withBorder style={{ height: '100%' }}>
              <Card.Section>
                <Image src={blog.image} alt={blog.title} />
              </Card.Section>

              <Text fw={700} size="lg" mt="md" color="primary">
                {blog.title}
              </Text>
              <Text size="xs" fw={500}>
                Author: {blog.author}
              </Text>

              <Text color="dimmed" size="sm">
                {truncateText(blog.summary, 100)}
              </Text>

              <Group justify="apart" mt="md">
                <Button
                  component="a"
                  href={blog.link}
                  gradient={{ from: 'primary', to: 'secondary' }}
                  variant="gradient"
                  radius="xl"
                  size="sm"
                >
                  Read More
                </Button>
              </Group>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Paper>
  );
};
