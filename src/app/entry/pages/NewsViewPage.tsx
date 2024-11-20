import React from 'react';
import { Container, Image, Text, Paper, Stack, Divider, Box, Group, Avatar } from '@mantine/core';
import { DefaultLayout } from '../layout/DefaultLayout';

const news = {
  id: 1,
  image:
    'https://t3.ftcdn.net/jpg/03/27/55/60/360_F_327556002_99c7QmZmwocLwF7ywQ68ChZaBry1DbtD.jpg', // Update with an actual image URL
  title: 'Visit Leland’s and Grab a Cup of Joe',
  content: `
    Et hendrerit elit euismod massa turpis, sodales ac aptent parturient vestibulum, volutpat convallis sodales ante ac, 
    et eu feugiat risus mollis phasellus, aliquet bibendum pretium. Pellentesque ipsum conubia, proin ut elit sit. 
    Vehicula eu elit quisque posuere porttitor, purus vestibulum libero massa maecenas at. Lacus cursus sed, eu donec eget 
    vel mauris habitasse ipsum, neque etiam fringilla, lorem sed egestas lorem.

    Veit vel, lacus maecenas semper, tellus libero metus feugiat at aenean malesuada. Adipiscing dolor lobortis vitae eros 
    mollis, justo ac, eget lacus pulvinar in fusce, neque elementum malesuada in in eros, in semper in mauris bibendum. 
    Dolor et mauris viverra aliquet nec, a mauris, augue turpis lectus fermentum pellentesque tincidunt in. 
    Adipiscing quis, vestibulum est fames aliquet faucibus sit tellus, amet ante. Massa nisl id mauris a morbi dui, 
    parturient vel. Posuere laboris pellentesque laoreet, pharetra porttitor morbi velit ipsum arcu eu, ipsum vivamus, mauris 
    mi dolorum. Amet odio risus ante, ut ipsum scelerisque tincidunt vitae eu vestibulum neque, ut in vestibulum ut mi ipsum. 
    In non sollicitudin est imperdiet a id, in euismod in eros pellentesque a, leo venenatis.
  `,
  author: 'Leland’s Cabins',
  date: 'November 12, 2015',
};

export const NewsViewPage = () => {
  return (
    <DefaultLayout>
      <Paper shadow="none">
        <Container size="lg" py="xl">
          {/* Header Section - Image and Title in Same Row */}
          <Group justify="start" mx={'xxl'}>
            <Avatar src={news.image} alt={news.title} size={350} radius="50%" />

            <Paper shadow="none" maw={500}>
              <Text fw={700} size="72px" ta="left">
                {news.title}
              </Text>
              <Divider size={2} my="md" />
              <Text size="sm" color="dimmed" ta="left">
                Published on {news.date}
              </Text>
            </Paper>
          </Group>
          {/* Content Section */}
          <Box mt="lg" pl="175px">
            <Text size="md" lh={1.6}>
              {news.content.split('\n').map((paragraph, index) => (
                <Text key={index} mb="md">
                  {paragraph}
                </Text>
              ))}
            </Text>
          </Box>
        </Container>
      </Paper>
    </DefaultLayout>
  );
};
