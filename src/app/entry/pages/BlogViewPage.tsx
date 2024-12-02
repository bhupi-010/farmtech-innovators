import React from 'react';
import { Image, Text, Paper, Stack, Group, Divider, Center, Textarea, Button } from '@mantine/core';
import { DefaultLayout } from '../layout/DefaultLayout';
import { useAddComment, useGetBlog } from '../hooks';
import { useParams } from 'react-router-dom';
import { ErrorPage, LoadingIndicator } from '@farmtech/shared';
import { notifications } from '@mantine/notifications';

export const BlogViewPage = () => {
  const { id } = useParams();
  // const addComment = useAddComment(id);
  const { data: blog, isError, isLoading } = useGetBlog(id);
  // const [comment, setComment] = React.useState('');

  if (isLoading)
    return (
      <Center>
        <LoadingIndicator />
      </Center>
    );
  if (isError || !blog) return <ErrorPage />;

  // const handleCommentSubmit = () => {
  //   addComment.mutate({ text: comment}, { onSuccess: () => {
  //     notifications.show({
  //       color: 'teal',
  //       title: 'Comment Added Successfully',
  //       message: 'Your comment has been added successfully.',
  //     })
  //   },
  //   onError: (err: any) => {
  //     notifications.show({
  //       color: 'red',
  //       title: 'Error',
  //       message: err?.message
  //         ? err?.message
  //         : 'Failed to add comment! Please try again later',
  //     });
  //   }});
  //   setComment(''); 
  // };

  return (
    <DefaultLayout>
      <Paper shadow="none" p="lg">
        <Stack align="center" gap="md">
          {/* Blog Title and Author (Centered) */}
          <Text fw={700} size="32px" ta="center">
            {blog.data.title}
          </Text>

          <Group gap="xs" color="dimmed" justify="center">
            <Text size="sm">By:</Text>
            <Text size="sm" fw={500}>
              {blog.data.author}
            </Text>
          </Group>

          {/* Blog Image */}
          <Image src={blog.data.imageUrl} alt={blog.data.title} radius="md" mb="lg" />
        </Stack>

        {/* Blog Details (Left-Aligned) */}
        <Stack align="start" gap="md">
          <Group gap="xs" color="dimmed">
            <Text size="sm">Date:</Text>
            <Text size="sm" fw={500}>
              {new Date(blog.data.createdAt).toLocaleDateString()}
            </Text>
          </Group>

          <Group gap="xs" color="dimmed">
            <Text size="sm">Category:</Text>
            <Text size="sm" fw={500}>
              {blog.data.category.name}
            </Text>
          </Group>

          <Group gap="xs" color="dimmed">
            <Text size="sm">Tags:</Text>
            {blog.data.tags.map((tag: any) => (
              <Text key={tag.id} size="sm" fw={500}>
                {tag.name}
              </Text>
            ))}
          </Group>
        </Stack>

        <Divider my="lg" />

        {/* Blog Content (Left-Aligned) */}
        <Stack gap="md">
          {blog.data.content.split('\n').map((paragraph: string, index: number) => (
            <Text key={index} size="md" ta="start">
              {paragraph}
            </Text>
          ))}
        </Stack>
        {/* <Textarea
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          minRows={3}
        />
        <Button
          mt="md"
          onClick={handleCommentSubmit}
          loading={addComment.isPending}
          disabled={addComment.isPending}
        >
          comment
        </Button> */}
      </Paper>
    </DefaultLayout>
  );
};
