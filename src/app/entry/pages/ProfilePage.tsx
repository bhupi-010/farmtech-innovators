import React, { useState } from 'react';
import {
  Grid,
  Card,
  Text,
  Stack,
  Avatar,
  Paper,
  Accordion,
  Button,
  Modal,
  Divider,
  Group,
  ActionIcon,
  Progress,
  Image,
} from '@mantine/core';
import { DefaultLayout } from '../layout/DefaultLayout';
import { FormComponent } from '../components/BasicComponents';
import { IconEdit } from '@tabler/icons-react';
import { FarmlandDetailsForm, SoilDetailsForm } from '../components/RegisterFarmLand';
import { FormProvider } from '../context';
import { useGetProfile, useGetFarmland, useCropSuggestion } from '../hooks';
import { notifications } from '@mantine/notifications';

export const ProfilePage = () => {
  const getCropSuggestion = useCropSuggestion();
  const { data: profile, isPending: isPendingProfile, isError: isErrorProfile } = useGetProfile();

  const [modals, setModals] = useState({
    userModalOpen: false,
    farmlandModalOpen: false,
    soilModalFormOpen: false,
    soilModalOpen: false,
    cropModalOpen: false,
  });

  const [selectedSoilDetails, setSelectedSoilDetails] = useState<any>(null);
  const [selectedFarmland, setSelectedFarmland] = useState<any>(null);
  const [cropSuggestion, setCropSuggestion] = useState<any>(null);

  // Function to toggle modal states dynamically
  const toggleModal = (modalKey: keyof typeof modals, isOpen: boolean) => {
    setModals((prev) => ({ ...prev, [modalKey]: isOpen }));
  };

  const farmlandItems = profile?.data?.farmlands.map((farm: any, index: number) => (
    <Accordion.Item key={index} value={`farmland-${index}`}>
      <Accordion.Control>
        <Text fw={500}>
          {' '}
          {` ${farm.location.city}, ${farm.location.state}, ${farm.location.country}, ${farm.location.postalCode}`}
        </Text>
      </Accordion.Control>
      <Accordion.Panel>
        <Group align="top">
          <Image
            src={
              farm.imageUrl ??
              'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg'
            }
            height={200}
            width={200}
          />
          <div>
            <Text>Description: {farm.description}</Text>
            <Text>Area: {farm.area} hectares</Text>
          </div>
        </Group>

        <Group>
          {farm.soilProperties ? (
            <>
              <Button
                onClick={() => {
                  setSelectedSoilDetails(farm);
                  setSelectedFarmland(farm?.id);
                  toggleModal('soilModalOpen', true);
                }}
                mt="md"
                variant="outline"
              >
                View Soil Detail
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  setSelectedFarmland(farm?.id);
                  toggleModal('soilModalFormOpen', true);
                }}
                mt="md"
                variant="outline"
              >
                Add Soil Detail
              </Button>
            </>
          )}

          <Button
            onClick={() => {
              setSelectedFarmland(farm?.farmland);
              toggleModal('farmlandModalOpen', true);
            }}
            mt="md"
            variant="outline"
          >
            Edit Farmland Detail
          </Button>
          <Button
            onClick={() => {
              getCropSuggestion.mutate(
                {
                  farmland: farm?.id,
                },
                {
                  onSuccess: (data: any) => {
                    setCropSuggestion(data?.data?.data);
                    toggleModal('cropModalOpen', true);
                    notifications.show({
                      color: 'blue',
                      title: 'Success',
                      message: 'Crop suggestion fetched successfully',
                    });
                  },
                  onError: (err: any) => {
                    notifications.show({
                      color: 'red',
                      title: 'Error',
                      message: err?.message
                        ? err?.message
                        : 'Failed to fetch crop suggestion! Please try again later',
                    });
                  },
                }
              );
            }}
            mt="md"
            variant="outline"
          >
            Crop Suggestion
          </Button>
        </Group>
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <DefaultLayout>
      <FormProvider>
        <Paper shadow="none">
          <Stack align="center" mb="lg">
            <Text fw={700} ta="center" size="36px" style={{ color: '#333' }}>
              My Profile
            </Text>
            <Text c="dimmed" ta="center">
              View your personal and farmland details
            </Text>
          </Stack>

          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Card shadow="sm" radius="md" withBorder>
                <Stack gap={0} align="left">
                  <Group justify="space-between">
                    <Text fw={700} size="lg">
                      Name: {`${profile?.data?.firstName} ${profile?.data?.lastName}`}
                    </Text>
                    <ActionIcon onClick={() => toggleModal('userModalOpen', true)}>
                      <IconEdit size={16} />
                    </ActionIcon>
                  </Group>
                  <Text size="sm" mt={'xs'}>
                    Email: {profile?.data?.email}
                  </Text>
                  <Text>Email Verified: {profile?.data?.isEmailVerified ? 'Yes' : 'No'}</Text>
                </Stack>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Accordion variant="contained" defaultValue="farmland-0">
                {farmlandItems}
              </Accordion>
            </Grid.Col>
          </Grid>

          {/* Modals */}
          {selectedSoilDetails && (
            <Modal
              opened={modals.soilModalOpen}
              onClose={() => toggleModal('soilModalOpen', false)}
              title="Soil Details"
              size="xl"
            >
              <FormComponent fw={450} title="Soil Properties:">
                <Text>Soil Type: {selectedSoilDetails.soilProperties.soilType}</Text>
                <Text>pH: {selectedSoilDetails.soilProperties.soilPh}</Text>
                <Text>
                  Nutrients: Nitrogen (N): {selectedSoilDetails.soilProperties.nutrients.nitrogen}%,
                  Phosphorus (P): {selectedSoilDetails.soilProperties.nutrients.phosphorus}%,
                  Potassium (K): {selectedSoilDetails.soilProperties.nutrients.potassium}%
                </Text>
                <Text>Last Test Date: {selectedSoilDetails.soilProperties.testDate}</Text>
              </FormComponent>
              <FormComponent fw={450} title="Climate Data:">
                <Text>Annual Rainfall: {selectedSoilDetails.climateData.annualRainfall} mm</Text>
                <Text>Temperature Range: {selectedSoilDetails.climateData.temperatureRange}</Text>
                <Text>Humidity Levels: {selectedSoilDetails.climateData.humidityLevels}%</Text>
              </FormComponent>

              <FormComponent fw={450} title="Crop History:">
                {selectedSoilDetails.cropHistory.map((crop: any, index: number) => (
                  <>
                    <Paper shadow="none" key={index}>
                      <Text>Crop: {crop.cropName}</Text>
                      <Text>Yield: {crop.yieldAmount} kg</Text>
                      <Text>Planting Date: {crop.plantingDate}</Text>
                      <Text>Harvest Date: {crop.harvestDate}</Text>
                    </Paper>
                    {index !== selectedSoilDetails.cropHistory.length - 1 && <Divider my={'md'} />}
                  </>
                ))}
              </FormComponent>
              <Group justify="end" my={'lg'}>
                <Button color={'red.6'} onClick={() => toggleModal('soilModalOpen', false)}>
                  Close
                </Button>
                {/* <Button
                  color={'blue.6'}
                  onClick={() => {
                    toggleModal('soilModalOpen', false);
                    toggleModal('soilModalFormOpen', true);
                  }}
                >
                  Edit
                </Button> */}
              </Group>
            </Modal>
          )}

          <Modal
            opened={modals.userModalOpen}
            onClose={() => toggleModal('userModalOpen', false)}
            title="User Edit Modal"
          >
            <Text>User Edit Modal</Text>
          </Modal>

          <Modal
            size="xl"
            opened={modals.farmlandModalOpen}
            onClose={() => toggleModal('farmlandModalOpen', false)}
          >
            <FarmlandDetailsForm id={selectedFarmland} />
          </Modal>

          <Modal
            size="xl"
            opened={modals.soilModalFormOpen}
            onClose={() => toggleModal('soilModalFormOpen', false)}
          >
            <SoilDetailsForm id={selectedFarmland} />
          </Modal>

          <Modal
            size="xl"
            opened={modals.cropModalOpen}
            title="Crop Suggestions"
            onClose={() => toggleModal('cropModalOpen', false)}
          >
            {cropSuggestion && cropSuggestion?.length > 0 ? (
              <>
                <Stack gap={2}>
                  {cropSuggestion.map((item: any, index: number) => (
                    <Card shadow="none" key={index}>
                      <Text>{item.crop}</Text>
                      <Progress.Root size="xl">
                        <Progress.Section value={item.probability}>
                          <Progress.Label>probability {item.probability}%</Progress.Label>
                        </Progress.Section>
                      </Progress.Root>
                      {/* <Progress color="green"  label="Probability" radius="lg" size="lg" value={item.probability} striped animated /> */}
                    </Card>
                  ))}
                </Stack>
              </>
            ) : (
              <Text>No crop suggestions found.</Text>
            )}
          </Modal>
        </Paper>
      </FormProvider>
    </DefaultLayout>
  );
};
