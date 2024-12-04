import React from 'react';
import {
  Image,
  Text,
  Paper,
  Stack,
  Group,
  Divider,
  Center,
  Textarea,
  Button,
  Avatar,
  ScrollArea,
} from '@mantine/core';
import { DefaultLayout } from '../layout/DefaultLayout';
import { useAddComment, useGetBlog, useGetComments, useGetCommentsById } from '../hooks';
import { useParams } from 'react-router-dom';
import { ErrorPage, LoadingIndicator } from '@farmtech/shared';
import { notifications } from '@mantine/notifications';
import { formatDateWithTime } from '../utils/formatdate';
import { useAuth } from '@farmtech/auth';

export const BlogViewPage = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const addComment = useAddComment();
  const { data: blog, isError, isLoading } = useGetBlog(id);
  // const { data: comments, isError: commentsError, isLoading: commentsLoading } = useGetCommentsById(id);
  const [comment, setComment] = React.useState('');

  if (isLoading)
    return (
      <Center>
        <LoadingIndicator />
      </Center>
    );
  if (isError || !blog) return <ErrorPage />;

  const handleCommentSubmit = () => {
    if (!comment.trim()) {
      notifications.show({
        color: 'yellow',
        title: 'Empty Comment',
        message: 'Please write a comment before submitting.',
      });
      return;
    }
    addComment.mutate(
      { content: comment, post: id },
      {
        onSuccess: () => {
          notifications.show({
            color: 'teal',
            title: 'Comment Added Successfully',
            message: 'Your comment has been added successfully.',
          });
          setComment('');
        },
        onError: (err: any) => {
          notifications.show({
            color: 'red',
            title: 'Error',
            message: err?.message ? err?.message : 'Failed to add comment! Please try again later.',
          });
        },
      }
    );
  };

  return (
    <DefaultLayout>
      <Paper shadow="none" p="lg">
        <Stack align="center" gap="md">
          {/* Blog Title and Author */}
          <Text fw={700} size="32px" ta="center">
            {blog.data.title}
          </Text>
          <Group gap="xs" color="dimmed">
            <Text size="sm">By:</Text>
            <Text size="sm" fw={500}>
              {blog.data.author}
            </Text>
          </Group>

          {/* Blog Image */}
          <Image src={blog.data.imageUrl} alt={blog.data.title} radius="md" mb="lg" />
        </Stack>

        {/* Blog Metadata */}
        <Stack align="start" gap="sm">
          <Group gap="xs" color="dimmed">
            <Text size="sm">Date:</Text>
            <Text size="sm" fw={500}>
              {formatDateWithTime(blog.data.createdAt)}
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

        {/* Blog Content */}
        <Stack gap="md">
          {blog.data.content.split('\n').map((paragraph: string, index: number) => (
            <Text key={index} size="md" ta="start">
              {paragraph}
            </Text>
          ))}
        </Stack>

        <Divider my="lg" />

        {/* Comments Section */}

        <Stack gap="lg">
          <Text fw={600} size="xl">
            Comments
          </Text>

          <div>
            {blog?.data?.comments?.map((comment: any) => (
              <Paper key={comment.id} p="md" radius="md" shadow="xs" mb="sm" withBorder>
                <Group gap="sm">
                  <Avatar
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
                    alt={comment.author}
                    radius="xl"
                  />
                  <div>
                    <Text size="sm" fw={500}>
                      {comment.author}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {formatDateWithTime(comment.createdAt)}
                    </Text>
                  </div>
                </Group>
                <Text mt="sm" size="sm">
                  {comment.content}
                </Text>
              </Paper>
            ))}
          </div>

          {/* Add Comment Section */}
          {isAuthenticated && (
            <>
              <Stack gap="sm">
                <Textarea
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  minRows={3}
                  autosize
                />
                <Button
                  mt="sm"
                  maw={200}
                  radius={'xl'}
                  onClick={handleCommentSubmit}
                  loading={addComment.isPending}
                  disabled={addComment.isPending}
                >
                  Add Comment
                </Button>
              </Stack>
            </>
          )}
        </Stack>
      </Paper>
    </DefaultLayout>
  );
};
