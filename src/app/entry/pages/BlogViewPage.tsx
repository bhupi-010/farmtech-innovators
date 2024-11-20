import React from 'react';
import { Container, Image, Text, Paper, Stack, Group, Divider, Button } from '@mantine/core';
import { DefaultLayout } from '../layout/DefaultLayout';
const blog = {
  id: 1,
  image:
    'https://images.unsplash.com/photo-1511974035430-5de47d3b95da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  title: 'The Art of Blogging: Tips for Beginners',
  content: `
      Blogging has transformed from a personal journal into a platform for sharing expertise, building communities, and driving businesses forward. But how do you create a blog that not only captures attention but keeps readers coming back?
  
      ## Why Start a Blog?
      A blog is more than just a collection of articles. It’s a space where you can:
      - Share your unique insights and experiences.
      - Build an online portfolio to showcase your expertise.
      - Foster meaningful connections with like-minded individuals.
  
      ## Essential Tips for Successful Blogging
      1. **Know Your Audience**: The foundation of any great blog is understanding who you’re writing for. Identify their challenges, interests, and preferences.
      2. **Quality Over Quantity**: Instead of churning out countless posts, focus on creating detailed, value-packed content.
      3. **Be Consistent**: Publishing on a regular schedule helps build trust and keeps your audience engaged.
      4. **Visuals Matter**: High-quality images, infographics, and videos can significantly enhance your blog’s appeal.
  
      ## Monetizing Your Blog
      Once your blog gains traction, you can explore monetization strategies like:
      - Sponsored posts and partnerships.
      - Affiliate marketing.
      - Selling your own products or services.
  
      Blogging is a journey that requires patience, creativity, and resilience. With time, dedication, and these tips, you’ll be on your way to building a blog that not only resonates with readers but also brings your vision to life.
    `,
  author: 'Jane Smith',
  date: 'November 20, 2024',
};

export const BlogViewPage = () => {
  return (
    <DefaultLayout>
      <Paper shadow="none">
        <Stack gap="sm" p="lg">
          <Text fw={700} size="32px" ta="center">
            {blog.title}
          </Text>
          <Group justify="center" gap="sm" color="dimmed">
            <Text size="sm">By {blog.author}</Text>
            <Divider orientation="vertical" />
            <Text size="sm">{blog.date}</Text>
          </Group>
        </Stack>
        <Image src={blog.image} alt={blog.title} radius="md" my="lg" />
        <Stack gap="md" px="lg" pb="lg">
          <Text size="md" fw={500}>
            {blog.content.split('\n').map((paragraph, index) => (
              <Text key={index} mb="md">
                {paragraph}
              </Text>
            ))}
          </Text>
        </Stack>
      </Paper>
    </DefaultLayout>
  );
};
