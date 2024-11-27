import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  Image,
  Text,
  Group,
  Button,
  TextInput,
  Textarea,
  Divider,
  Stack,
  Select,
  NumberInput,
  Paper,
  Avatar,
  Center,
} from '@mantine/core';
import { DefaultLayout } from '../layout/DefaultLayout';

export const ProfilePage = () => {
  // Mock data for the profile and land information
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Green Street, Springfield',
    photo:
      'https://static.vecteezy.com/system/resources/previews/028/794/707/non_2x/cartoon-cute-school-boy-photo.jpg', // Placeholder photo
  });

  const [landData, setLandData] = useState({
    soilType: 'Loam',
    pH: 6.5,
    fertilityLevel: 'Medium',
    areaSize: 200,
  });

  const [suggestedPlants, setSuggestedPlants] = useState([
    'Tomatoes',
    'Cucumbers',
    'Lettuce',
    'Spinach',
  ]);

  const handleSaveProfile = () => {
    console.log('Profile Updated', userData);
    console.log('Land Data Updated', landData);
  };

  const handleSaveLandData = () => {
    console.log('Land Data Updated', landData);
  };

  return (
    <DefaultLayout>
      <Paper shadow="none">
        {/* <Stack align="center" mb="lg">
          <Text fw={700} ta="center" size="36px" style={{ color: '#333' }}>
            My Profile
          </Text>
          <Text c="dimmed" ta="center">
            Manage your personal and land data details
          </Text>
        </Stack> */}

        {/* <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card shadow="sm" radius="md" withBorder>
              <Center my={'md'}>
                <Card.Section>
                  <Avatar
                    src={userData.photo}
                    alt={userData.name}
                    size={200}
                    style={{ objectFit: 'cover' }}
                    radius="50%"
                  />
                </Card.Section>
              </Center>
              <Stack p="md">
                <TextInput
                  label="Name"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  placeholder="Enter your name"
                />
                <TextInput
                  label="Email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  placeholder="Enter your email"
                  disabled
                />
                <TextInput
                  label="Address"
                  value={userData.address}
                  onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                  placeholder="Enter your address"
                />

                <Button  mt="md" onClick={handleSaveProfile}>
                  Save Profile
                </Button>

              </Stack>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card shadow="sm" radius="md" withBorder>
             
                <Text fw={700} size="lg" c={"primary"} mt={"md"}>
                  Land Data
                </Text>
                <Text c="dimmed" size="sm" mb={"md"}>
                  Soil information and recommendations for plant suitability
                </Text>

                <Select
                  label="Soil Type"
                  my={"xs"}
                  value={landData.soilType}
                  onChange={(value) =>
                    setLandData({ ...landData, soilType: value || landData.soilType })
                  }
                  data={['Loam', 'Clay', 'Sandy', 'Peaty', 'Saline']}
                  placeholder="Select Soil Type"
                />
                <NumberInput
                  label="Soil pH"
                  my={"xs"}
                  value={landData.pH}
                  onChange={(value) => setLandData({ ...landData, pH: value || landData.pH })}
                  min={0}
                  max={14}
                  step={0.1}
                  placeholder="Enter soil pH"
                />
                <Select
                  label="Fertility Level"
                  my={"xs"}
                  value={landData.fertilityLevel}
                  onChange={(value) =>
                    setLandData({ ...landData, fertilityLevel: value || landData.fertilityLevel })
                  }
                  data={['Low', 'Medium', 'High']}
                  placeholder="Select Fertility Level"
                />
                <NumberInput
                  label="Area Size (sq. meters)"
                  my={"xs"}
                  value={landData.areaSize}
                  onChange={(value) =>
                    setLandData({ ...landData, areaSize: value || landData.areaSize })
                  }
                  min={1}
                  placeholder="Enter land area size"
                />

                <Button mt="md" onClick={handleSaveLandData}>
                  Save Land Data
                </Button>
            </Card>
          </Grid.Col>
        </Grid> */}
      </Paper>
    </DefaultLayout>
  );
};
