// import React, { useState } from 'react';
// import {
//   Grid,
//   Card,
//   Text,
//   Stack,
//   Avatar,
//   Paper,
//   Accordion,
//   Button,
//   Modal,
//   Divider,
//   Group,
//   ActionIcon,
// } from '@mantine/core';
// import { DefaultLayout } from '../layout/DefaultLayout';
// import { FormComponent } from '../components/BasicComponents';
// import { IconEdit } from '@tabler/icons-react';
// import { FarmlandDetailsForm, SoilDetailsForm } from '../components/RegisterFarmLand';
// import { FormProvider } from '../context';

// export const ProfilePage = () => {
//   // Mock data for the profile and farmland information in camelCase
//   const [userData] = useState({
//     firstName: 'John',
//     lastName: 'Doe',
//     address: '123 Green Street, Springfield',
//     email: 'john.doe@example.com',
//   });

//   const [farmlandData] = useState([
//     {
//       description: 'Fertile farmland near the river.',
//       location: {
//         address: '123 Greenfield Lane, Springfield',
//         city: 'Springfield',
//         state: 'Illinois',
//         country: 'USA',
//         postalCode: '62704',
//       },
//       area: 50.5,
//       soilProperties: {
//         soilType: 'Loamy',
//         soilPh: 6.8,
//         soilTexture: 'Fine',
//         soilOrganicMatter: 3.5,
//         soilDrainage: 'Well-drained',
//         waterRetentionCapacity: 5.2,
//         nutrients: {
//           nitrogen: 12,
//           phosphorus: 8,
//           potassium: 6,
//         },
//         testDate: '2024-11-26',
//       },
//       climateData: {
//         annualRainfall: 1200.5,
//         temperatureRange: '15-25°C',
//         growingDegreeDays: 150,
//         frostDates: {
//           firstFrost: '2024-10-15',
//           lastFrost: '2024-04-10',
//         },
//         humidityLevels: 70.5,
//       },
//       waterResources: {
//         irrigationMethod: 'Drip',
//         waterQuality: {
//           ph: 7.0,
//           salinity: 'Low',
//         },
//         waterAvailability: true,
//         elevation: 200.5,
//         slope: 5.0,
//       },
//       cropHistories: [
//         {
//           cropName: 'Wheat',
//           yieldAmount: 500.0,
//           plantingDate: '2024-01-15',
//           harvestDate: '2024-05-20',
//           rotationPlan: {
//             next: 'Corn',
//             afterNext: 'Legumes',
//           },
//         },
//         {
//           cropName: 'Rice',
//           yieldAmount: 800.0,
//           plantingDate: '2023-06-01',
//           harvestDate: '2023-10-10',
//           rotationPlan: {
//             next: 'Barley',
//           },
//         },
//       ],
//     },
//   ]);

//   // Modal state for soil details
//   const [isSoilModalOpen, setSoilModalOpen] = useState(false);
//   const [selectedSoilDetails, setSelectedSoilDetails] = useState<any>(null);
//   const [selectedFarmland, setSelectedFarmland] = useState<any>(null);

//   // Handle opening of the modal with selected soil details
//   const openSoilModal = (soilDetails: any) => {
//     setSelectedSoilDetails(soilDetails);
//     setSoilModalOpen(true);
//   };

//   // Modal states for editing user and farmland data
//   const [userModalOpen, setUserModalOpen] = useState(false);
//   const [farmlandModalOpen, setFarmlandModalOpen] = useState(false);
//   const [soilModalFormOpen, setSoilModalFormOpen] = useState(false);

//   // Handle opening of the modals
//   const openUserModal = () => setUserModalOpen(true);
//   const closeUserModal = () => setUserModalOpen(false);

//   const openSoilModalForm = () => setSoilModalFormOpen(true);
//   const closeSoilModalForm = () => setSoilModalFormOpen(false);

//   const openFarmlandModal = () => setFarmlandModalOpen(true);
//   const closeFarmlandModal = () => setFarmlandModalOpen(false);

//   // Mapping over the farmland data to create accordion items
//   const farmlandItems = farmlandData.map((farm, index) => (
//     <Accordion.Item key={index} value={`farmland-${index}`}>
//       <Accordion.Control>
//         <Text fw={500}>{`Farmland ${index + 1}`}</Text>
//       </Accordion.Control>
//       <Accordion.Panel>
//         <Text> Description: {farm.description}</Text>
//         <Text>
//           Location:{' '}
//           {`${farm.location.address}, ${farm.location.city}, ${farm.location.state}, ${farm.location.country}, ${farm.location.postalCode}`}
//         </Text>
//         <Text>Area: {farm.area} hectares</Text>

//         {/* Conditionally render soil details button */}
//         <Group>
//           {farm.soilProperties ? (
//             <Button
//               onClick={() => {
//                 openSoilModal(farm);
//                 setSelectedFarmland(index + 1);
//               }}
//               mt="md"
//               variant="outline"
//             >
//               View Soil Detail
//             </Button>
//           ) : (
//             <Button component="a" href="/soil-detail" mt="md" variant="outline">
//               Add Soil Detail
//             </Button>
//           )}
//           <Button
//             onClick={() => {
//               setSelectedFarmland(index + 1);
//               openFarmlandModal();
//             }}
//             mt="md"
//             variant="outline"
//           >
//             Edit Farmland Detail
//           </Button>
//         </Group>
//       </Accordion.Panel>
//     </Accordion.Item>
//   ));

//   return (
//     <DefaultLayout>
//       <FormProvider>
//         <Paper shadow="none">
//           <Stack align="center" mb="lg">
//             <Text fw={700} ta="center" size="36px" style={{ color: '#333' }}>
//               My Profile
//             </Text>
//             <Text c="dimmed" ta="center">
//               View your personal and farmland details
//             </Text>
//           </Stack>

//           <Grid gutter="xl">
//             {/* User Data Section */}
//             <Grid.Col span={{ base: 12, md: 6 }}>
//               <Card shadow="sm" radius="md" withBorder>
//                 <Stack gap={0} align="left">
//                   <Group justify="space-between">
//                     <Text fw={700} size="lg">
//                       {' '}
//                       Name: {`${userData.firstName} ${userData.lastName}`}
//                     </Text>
//                     <ActionIcon onClick={openUserModal}>
//                       <IconEdit size={16} />
//                     </ActionIcon>
//                   </Group>

//                   <Text size="sm" mt={'xs'}>
//                     Email: {userData.email}
//                   </Text>
//                   <Text size="sm">Address: {userData.address}</Text>
//                 </Stack>
//               </Card>
//             </Grid.Col>

//             {/* Farmland Data Section with Accordion */}
//             <Grid.Col span={{ base: 12, md: 6 }}>
//               <Accordion variant="contained" defaultValue="farmland-0">
//                 {farmlandItems}
//               </Accordion>
//             </Grid.Col>
//           </Grid>

//           {/* Modal for viewing soil details */}
//           {selectedSoilDetails && (
//             <Modal
//               opened={isSoilModalOpen}
//               onClose={() => setSoilModalOpen(false)}
//               title="Soil Details"
//               size="xl"
//             >
//               <FormComponent fw={450} title="Soil Properties:">
//                 <Text>Soil Type: {selectedSoilDetails.soilProperties.soilType}</Text>
//                 <Text>pH: {selectedSoilDetails.soilProperties.soilPh}</Text>
//                 <Text>Soil Texture: {selectedSoilDetails.soilProperties.soilTexture}</Text>
//                 <Text>Organic Matter: {selectedSoilDetails.soilProperties.soilOrganicMatter}%</Text>
//                 <Text>Drainage: {selectedSoilDetails.soilProperties.soilDrainage}</Text>
//                 <Text>
//                   Water Retention Capacity:{' '}
//                   {selectedSoilDetails.soilProperties.waterRetentionCapacity} cm
//                 </Text>
//                 <Text>
//                   Nutrients: Nitrogen (N): {selectedSoilDetails.soilProperties.nutrients.nitrogen}%,
//                   Phosphorus (P): {selectedSoilDetails.soilProperties.nutrients.phosphorus}%,
//                   Potassium (K): {selectedSoilDetails.soilProperties.nutrients.potassium}%
//                 </Text>
//                 <Text>Last Test Date: {selectedSoilDetails.soilProperties.testDate}</Text>
//               </FormComponent>
//               <FormComponent fw={450} title="Climate Data:">
//                 <Text>Annual Rainfall: {selectedSoilDetails.climateData.annualRainfall} mm</Text>
//                 <Text>Temperature Range: {selectedSoilDetails.climateData.temperatureRange}</Text>
//                 <Text>
//                   Growing Degree Days: {selectedSoilDetails.climateData.growingDegreeDays}
//                 </Text>
//                 <Text>First Frost: {selectedSoilDetails.climateData.frostDates.firstFrost}</Text>
//                 <Text>Last Frost: {selectedSoilDetails.climateData.frostDates.lastFrost}</Text>
//                 <Text>Humidity Levels: {selectedSoilDetails.climateData.humidityLevels}%</Text>
//               </FormComponent>
//               <FormComponent fw={450} title="Water Resources:">
//                 <Text>
//                   Irrigation Method: {selectedSoilDetails.waterResources.irrigationMethod}
//                 </Text>
//                 <Text>Water pH: {selectedSoilDetails.waterResources.waterQuality.ph}</Text>
//                 <Text>
//                   Water Salinity: {selectedSoilDetails.waterResources.waterQuality.salinity}
//                 </Text>
//                 <Text>
//                   Water Availability:{' '}
//                   {selectedSoilDetails.waterResources.waterAvailability ? 'Yes' : 'No'}
//                 </Text>
//                 <Text>Elevation: {selectedSoilDetails.waterResources.elevation} meters</Text>
//                 <Text>Slope: {selectedSoilDetails.waterResources.slope}%</Text>
//               </FormComponent>
//               <FormComponent fw={450} title="Crop History:">
//                 {selectedSoilDetails.cropHistories.map((crop: any, index: number) => (
//                   <>
//                     <Paper shadow="none" key={index}>
//                       <Text>Crop: {crop.cropName}</Text>
//                       <Text>Yield: {crop.yieldAmount} kg</Text>
//                       <Text>Planting Date: {crop.plantingDate}</Text>
//                       <Text>Harvest Date: {crop.harvestDate}</Text>
//                       <Text>
//                         Rotation Plan: Next - {crop.rotationPlan.next}, After Next -{' '}
//                         {crop.rotationPlan.afterNext || 'N/A'}
//                       </Text>
//                     </Paper>
//                     {index !== selectedSoilDetails.cropHistories.length - 1 && (
//                       <Divider my={'md'} />
//                     )}
//                   </>
//                 ))}
//               </FormComponent>
//               <Group justify="end" my={'lg'}>
//                 <Button color={'red.6'} onClick={() => setSoilModalOpen(false)}>
//                   Close
//                 </Button>
//                 <Button
//                   color={'blue.6'}
//                   onClick={() => {
//                     setSoilModalOpen(false);
//                     selectedFarmland();
//                     setSoilModalFormOpen(true);
//                   }}
//                 >
//                   Edit
//                 </Button>
//               </Group>
//             </Modal>
//           )}
//           <Modal opened={userModalOpen} onClose={closeUserModal} title="User Edit Modal">
//             <Text>User Edit Modal</Text>
//           </Modal>
//           <Modal size={'xl'} opened={farmlandModalOpen} onClose={closeFarmlandModal}>
//             <FarmlandDetailsForm id={selectedFarmland} />
//           </Modal>
//           <Modal size={'xl'} opened={soilModalFormOpen} onClose={closeSoilModalForm}>
//             <SoilDetailsForm id={selectedFarmland} />
//           </Modal>
//         </Paper>
//       </FormProvider>
//     </DefaultLayout>
//   );
// };

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
} from '@mantine/core';
import { DefaultLayout } from '../layout/DefaultLayout';
import { FormComponent } from '../components/BasicComponents';
import { IconEdit } from '@tabler/icons-react';
import { FarmlandDetailsForm, SoilDetailsForm } from '../components/RegisterFarmLand';
import { FormProvider } from '../context';

export const ProfilePage = () => {
  const [userData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Green Street, Springfield',
    email: 'john.doe@example.com',
  });

  const [farmlandData] = useState([
    {
      farmland: 1,
      description: 'Fertile farmland near the river.',
      location: {
        address: '123 Greenfield Lane, Springfield',
        city: 'Springfield',
        state: 'Illinois',
        country: 'USA',
        postalCode: '62704',
      },
      area: 50.5,
      soilProperties: {
        soilType: 'Loamy',
        soilPh: 6.8,
        soilTexture: 'Fine',
        soilOrganicMatter: 3.5,
        soilDrainage: 'Well-drained',
        waterRetentionCapacity: 5.2,
        nutrients: {
          nitrogen: 12,
          phosphorus: 8,
          potassium: 6,
        },
        testDate: '2024-11-26',
      },
      climateData: {
        annualRainfall: 1200.5,
        temperatureRange: '15-25°C',
        growingDegreeDays: 150,
        frostDates: {
          firstFrost: '2024-10-15',
          lastFrost: '2024-04-10',
        },
        humidityLevels: 70.5,
      },
      waterResources: {
        irrigationMethod: 'Drip',
        waterQuality: {
          ph: 7.0,
          salinity: 'Low',
        },
        waterAvailability: true,
        elevation: 200.5,
        slope: 5.0,
      },
      cropHistories: [
        {
          cropName: 'Wheat',
          yieldAmount: 500.0,
          plantingDate: '2024-01-15',
          harvestDate: '2024-05-20',
          rotationPlan: {
            next: 'Corn',
            afterNext: 'Legumes',
          },
        },
        {
          cropName: 'Rice',
          yieldAmount: 800.0,
          plantingDate: '2023-06-01',
          harvestDate: '2023-10-10',
          rotationPlan: {
            next: 'Barley',
          },
        },
      ],
    },
    {
      farmland: 1,
      description: 'Fertile farmland near the river.',
      location: {
        address: '123 Greenfield Lane, Springfield',
        city: 'Springfield',
        state: 'Illinois',
        country: 'USA',
        postalCode: '62704',
      },
      area: 50.5,
      soilProperties: {
        soilType: 'Loamy',
        soilPh: 6.8,
        soilTexture: 'Fine',
        soilOrganicMatter: 3.5,
        soilDrainage: 'Well-drained',
        waterRetentionCapacity: 5.2,
        nutrients: {
          nitrogen: 12,
          phosphorus: 8,
          potassium: 6,
        },
        testDate: '2024-11-26',
      },
      climateData: {
        annualRainfall: 1200.5,
        temperatureRange: '15-25°C',
        growingDegreeDays: 150,
        frostDates: {
          firstFrost: '2024-10-15',
          lastFrost: '2024-04-10',
        },
        humidityLevels: 70.5,
      },
      waterResources: {
        irrigationMethod: 'Drip',
        waterQuality: {
          ph: 7.0,
          salinity: 'Low',
        },
        waterAvailability: true,
        elevation: 200.5,
        slope: 5.0,
      },
      cropHistories: [
        {
          cropName: 'Wheat',
          yieldAmount: 500.0,
          plantingDate: '2024-01-15',
          harvestDate: '2024-05-20',
          rotationPlan: {
            next: 'Corn',
            afterNext: 'Legumes',
          },
        },
        {
          cropName: 'Rice',
          yieldAmount: 800.0,
          plantingDate: '2023-06-01',
          harvestDate: '2023-10-10',
          rotationPlan: {
            next: 'Barley',
          },
        },
      ],
    },
  ]);

  // Centralized modal state
  const [modals, setModals] = useState({
    userModalOpen: false,
    farmlandModalOpen: false,
    soilModalFormOpen: false,
    soilModalOpen: false,
  });

  const [selectedSoilDetails, setSelectedSoilDetails] = useState<any>(null);
  const [selectedFarmland, setSelectedFarmland] = useState<any>(null);

  // Function to toggle modal states dynamically
  const toggleModal = (modalKey: keyof typeof modals, isOpen: boolean) => {
    setModals((prev) => ({ ...prev, [modalKey]: isOpen }));
  };

  // Mapping over farmland data
  const farmlandItems = farmlandData.map((farm, index) => (
    <Accordion.Item key={index} value={`farmland-${index}`}>
      <Accordion.Control>
        <Text fw={500}>{`Farmland ${index + 1}`}</Text>
      </Accordion.Control>
      <Accordion.Panel>
        <Text>Description: {farm.description}</Text>
        <Text>
          Location:{' '}
          {`${farm.location.address}, ${farm.location.city}, ${farm.location.state}, ${farm.location.country}, ${farm.location.postalCode}`}
        </Text>
        <Text>Area: {farm.area} hectares</Text>
        <Group>
          <Button
            onClick={() => {
              setSelectedSoilDetails(farm);
              setSelectedFarmland(farm?.farmland);
              toggleModal('soilModalOpen', true);
            }}
            mt="md"
            variant="outline"
          >
            View Soil Detail
          </Button>
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
                      Name: {`${userData.firstName} ${userData.lastName}`}
                    </Text>
                    <ActionIcon onClick={() => toggleModal('userModalOpen', true)}>
                      <IconEdit size={16} />
                    </ActionIcon>
                  </Group>
                  <Text size="sm" mt={'xs'}>
                    Email: {userData.email}
                  </Text>
                  <Text size="sm">Address: {userData.address}</Text>
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
                <Text>Soil Texture: {selectedSoilDetails.soilProperties.soilTexture}</Text>
                <Text>Organic Matter: {selectedSoilDetails.soilProperties.soilOrganicMatter}%</Text>
                <Text>Drainage: {selectedSoilDetails.soilProperties.soilDrainage}</Text>
                <Text>
                  Water Retention Capacity:{' '}
                  {selectedSoilDetails.soilProperties.waterRetentionCapacity} cm
                </Text>
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
                <Text>
                  Growing Degree Days: {selectedSoilDetails.climateData.growingDegreeDays}
                </Text>
                <Text>First Frost: {selectedSoilDetails.climateData.frostDates.firstFrost}</Text>
                <Text>Last Frost: {selectedSoilDetails.climateData.frostDates.lastFrost}</Text>
                <Text>Humidity Levels: {selectedSoilDetails.climateData.humidityLevels}%</Text>
              </FormComponent>
              <FormComponent fw={450} title="Water Resources:">
                <Text>
                  Irrigation Method: {selectedSoilDetails.waterResources.irrigationMethod}
                </Text>
                <Text>Water pH: {selectedSoilDetails.waterResources.waterQuality.ph}</Text>
                <Text>
                  Water Salinity: {selectedSoilDetails.waterResources.waterQuality.salinity}
                </Text>
                <Text>
                  Water Availability:{' '}
                  {selectedSoilDetails.waterResources.waterAvailability ? 'Yes' : 'No'}
                </Text>
                <Text>Elevation: {selectedSoilDetails.waterResources.elevation} meters</Text>
                <Text>Slope: {selectedSoilDetails.waterResources.slope}%</Text>
              </FormComponent>
              <FormComponent fw={450} title="Crop History:">
                {selectedSoilDetails.cropHistories.map((crop: any, index: number) => (
                  <>
                    <Paper shadow="none" key={index}>
                      <Text>Crop: {crop.cropName}</Text>
                      <Text>Yield: {crop.yieldAmount} kg</Text>
                      <Text>Planting Date: {crop.plantingDate}</Text>
                      <Text>Harvest Date: {crop.harvestDate}</Text>
                      <Text>
                        Rotation Plan: Next - {crop.rotationPlan.next}, After Next -{' '}
                        {crop.rotationPlan.afterNext || 'N/A'}
                      </Text>
                    </Paper>
                    {index !== selectedSoilDetails.cropHistories.length - 1 && (
                      <Divider my={'md'} />
                    )}
                  </>
                ))}
              </FormComponent>
              <Group justify="end" my={'lg'}>
                <Button color={'red.6'} onClick={() => toggleModal('soilModalOpen', false)}>
                  Close
                </Button>
                <Button
                  color={'blue.6'}
                  onClick={() => {
                    toggleModal('soilModalOpen', false);
                    toggleModal('soilModalFormOpen', true);
                  }}
                >
                  Edit
                </Button>
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
        </Paper>
      </FormProvider>
    </DefaultLayout>
  );
};
