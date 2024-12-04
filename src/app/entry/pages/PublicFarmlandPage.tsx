import React, { useState } from 'react';
import {
  Grid,
  Card,
  Text,
  Image,
  Group,
  Stack,
  Badge,
  Button,
  Paper,
  Modal,
  Divider,
} from '@mantine/core';
import { DefaultLayout } from '../layout/DefaultLayout';
import { useGetFarmland } from '../hooks';
import { modals } from '@mantine/modals';
import { FormComponent } from '../components/BasicComponents';

export const PublicFarmlandPage = () => {
  const { data: farmlands, isPending, isError } = useGetFarmland();

  // State Management
  const [selectedSoilDetails, setSelectedSoilDetails] = useState<any | null>(null);
  const [isSoilModalOpen, setSoilModalOpen] = useState(false);

  // Modal Handlers
  const openSoilModal = (soilDetails: any) => {
    setSelectedSoilDetails(soilDetails);
    setSoilModalOpen(true);
  };

  const closeSoilModal = () => {
    setSelectedSoilDetails(null);
    setSoilModalOpen(false);
  };

  // Loading and Error States
  if (isPending) {
    return (
      <DefaultLayout>
        <Text ta="center" size="lg" color="blue">
          Loading Farmlands...
        </Text>
      </DefaultLayout>
    );
  }

  if (isError) {
    return (
      <DefaultLayout>
        <Text ta="center" size="lg" color="red">
          Failed to fetch farmlands. Please try again later.
        </Text>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <Paper shadow="none" p="md">
        <Stack align="center" gap="xs" mb="xl">
          <Text fw={700} size="36px" ta="center" style={{ color: '#333' }}>
            Available Farmlands
          </Text>
          <Text color="dimmed" ta="center">
            Explore details of farmlands available in our network.
          </Text>
        </Stack>

        <Grid gutter="lg">
          {farmlands?.data?.map((farm: any, index: number) => (
            <Grid.Col key={index} span={{ base: 12, sm: 6, lg: 4 }}>
              <Card shadow="sm" radius="md" withBorder>
                <Card.Section>
                  <Image
                    src={
                      farm.imageUrl ??
                      'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg'
                    }
                    height={200}
                    alt={farm.description}
                  />
                </Card.Section>

                <Stack mt="md" gap="0">
                  <Text fw={500} size="lg">
                    {`${farm.location.city}, ${farm.location.state}`}
                  </Text>
                  <Text size="sm" >
                    {`${farm.location.country} - ${farm.location.postalCode}`}
                  </Text>
                  <Text size="sm" color="dimmed">Area: {farm.area} hectares</Text>
                  <Text size="sm" color="dimmed">
                    {farm.description}
                  </Text>
                </Stack>

                <Group mt="md" justify="apart">
                  {farm.soilProperties ? (
                    <Badge color="green" variant="outline">
                      Soil Data Available
                    </Badge>
                  ) : (
                    <Badge color="red" variant="outline">
                      Soil Data Missing
                    </Badge>
                  )}
                  <Button
                    variant="outline"
                    size="xs"
                    radius="md"
                    onClick={() => openSoilModal(farm)}
                  >
                    View Details
                  </Button>
                </Group>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Paper>

      {/* Soil Details Modal */}
      {selectedSoilDetails && (
            <Modal
              opened={isSoilModalOpen}
              onClose={() => closeSoilModal()}
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
                <Button color={'red.6'} onClick={() => closeSoilModal()}>
                  Close
                </Button>
              </Group>
            </Modal>
          )}
    </DefaultLayout>
  );
};
