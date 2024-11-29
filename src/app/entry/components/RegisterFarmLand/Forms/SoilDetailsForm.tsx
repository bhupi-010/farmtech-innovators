import React from 'react';
import { useForm, yupResolver } from '@mantine/form';
import {
  TextInput,
  Select,
  Slider,
  Group,
  NumberInput,
  SimpleGrid,
  Button,
  Grid,
  Card,
  Checkbox,
} from '@mantine/core';
import { FormComponent, PageHeaderNew } from '../../BasicComponents';
import * as yup from 'yup';
import { useFormContext } from '@farmtech/entry/context';
import { DateInput } from '@mantine/dates';
import { useAddSoilDetails, useEditSoilDetails } from '@farmtech/entry/hooks';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import { formatDateYYYYMMDD } from '@farmtech/entry/utils/formatdate';

const soilTypeOptions = [
  { value: 'clay', label: 'Clay' },
  { value: 'sandy', label: 'Sandy' },
  { value: 'loam', label: 'Loam' },
];

const defaultSoilValues = {
  soilProperties: {
    soilType: '',
    soilPH: 7,
    nutrients: {
      N: 0,
      P: 0,
      K: 0,
    },
    testDate: new Date(),
  },
  // Adding fields for climate data
  climateData: {
    annualRainfall: 0,
    temperatureRange: '',
    humidityLevels: 0,
  },

  // Adding fields for crop histories
  cropHistory: [
    {
      cropName: '',
      yieldAmount: 0,
      plantingDate: new Date(),
      harvestDate: new Date(),
    },
  ],
};

function formatDateFields(data: any) {
  // const formatDate = (date: any) => new Date(date).toISOString().split('T')[0];

  if (data.soilProperties?.testDate) {
    data.soilProperties.testDate = formatDateYYYYMMDD(data.soilProperties.testDate);
  }

  if (data.cropHistory) {
    data.cropHistory.forEach((history: any) => {
      if (history.plantingDate) history.plantingDate = formatDateYYYYMMDD(history.plantingDate);
      if (history.harvestDate) history.harvestDate = formatDateYYYYMMDD(history.harvestDate);
    });
  }

  return data;
}

const SoilDetailsSchema = yup.object().shape({
  soilProperties: yup.object().shape({
    soilType: yup.string().required('Soil type is required'),
    soilPH: yup
      .number()
      .required('Soil pH is required')
      .min(1, 'Soil pH must be greater than 1')
      .max(14, 'Soil pH must be less than 14'),
    nutrients: yup.object().shape({
      N: yup
        .number()
        .required('Nitrogen is required')
        .min(0, 'Nitrogen must be greater than 0')
        .max(100, 'Nitrogen must be less than 100'),
      P: yup
        .number()
        .required('Phosphorus is required')
        .min(0, 'Phosphorus must be greater than 0')
        .max(100, 'Phosphorus must be less than 100'),
      K: yup
        .number()
        .required('Potassium is required')
        .min(0, 'Potassium must be greater than 0')
        .max(100, 'Potassium must be less than 100'),
    }),
    testDate: yup.date().required('Test date is required'),
  }),
  // Adding validations for climate data
  climateData: yup.object().shape({
    annualRainfall: yup
      .number()
      .required('Annual rainfall is required')
      .min(0, 'Annual rainfall must be greater than 0'),
    temperatureRange: yup.string().required('Temperature range is required'),
    humidityLevels: yup
      .number()
      .required('Humidity level is required')
      .min(0, 'Humidity level must be greater than 0'),
  }),

  // Adding validations for crop histories
  cropHistory: yup.array().of(
    yup.object().shape({
      cropName: yup.string().required('Crop name is required'),
      yieldAmount: yup
        .number()
        .required('Yield amount is required')
        .min(0, 'Yield amount must be greater than 0'),
      plantingDate: yup.date().required('Planting date is required'),
      harvestDate: yup.date().required('Harvest date is required'),
    })
  ),
});

export const SoilDetailsForm: React.FC<{
  nextStep?: () => void;
  prevStep?: () => void;
  id?: string;
}> = ({ nextStep, prevStep, id }) => {
  const addSoil = useAddSoilDetails();
  const editSoil = useEditSoilDetails(id);
  const navigate = useNavigate();
  const { soilFormData, setSoilFormData, farmlandFormData } = useFormContext();
  const form = useForm({
    initialValues: defaultSoilValues,
    validate: yupResolver(SoilDetailsSchema),
  });
  const handleSubmit = (values: typeof defaultSoilValues) => {
    console.log('id', id);
    const formattedData = formatDateFields(values);
    addSoil.mutate(
      { ...formattedData, farmland: id ?? farmlandFormData.id },
      {
        onSuccess: (data: any) => {
          setSoilFormData(data?.data?.data);
          notifications.show({
            color: 'blue',
            title: 'Success',
            message: 'Soil details saved successfully.',
          });
        },
        onError: (err: any) => {
          notifications.show({
            color: 'red',
            title: 'Error',
            message: err?.message
              ? err?.message
              : 'Failed to save soil details! Please try again later',
          });
        },
      }
    );
  };
  console.log('form error', form.errors);
  console.log('form values', form.values);
  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <FormComponent title="Soil Details">
        <Grid gutter={'md'}>
          <Grid.Col span={{ sm: 12, md: 4 }}>
            <Select
              label="Soil Type"
              required
              placeholder="Select soil type"
              data={soilTypeOptions}
              {...form.getInputProps('soilProperties.soilType')}
            />
          </Grid.Col>
          <Grid.Col span={{ sm: 12, md: 4 }}>
            <NumberInput
              label="Soil pH"
              required
              placeholder="Enter soil pH"
              min={1}
              max={14}
              step={0.1}
              {...form.getInputProps('soilProperties.soilPH')}
            />
          </Grid.Col>
          <Grid.Col span={{ sm: 12, md: 4 }}>
            <DateInput
              label="Test Date"
              required
              placeholder="Select test date"
              {...form.getInputProps('soilProperties.testDate')}
            />
          </Grid.Col>
        </Grid>

        <FormComponent title="Nutrient Levels">
          <SimpleGrid cols={3} spacing="sm">
            <NumberInput
              label="Nitrogen (N)"
              required
              min={0}
              placeholder="N"
              {...form.getInputProps('soilProperties.nutrients.N')}
            />
            <NumberInput
              label="Phosphorus (P)"
              required
              min={0}
              placeholder="P"
              {...form.getInputProps('soilProperties.nutrients.P')}
            />
            <NumberInput
              label="Potassium (K)"
              required
              min={0}
              placeholder="K"
              {...form.getInputProps('soilProperties.nutrients.K')}
            />
          </SimpleGrid>
        </FormComponent>

        {/* Adding Climate Data Fields */}
        <FormComponent title="Climate Data">
          <Grid gutter={'md'}>
            <Grid.Col span={{ sm: 12, md: 6 }}>
              <NumberInput
                label="Annual Rainfall (mm)"
                required
                placeholder="Enter annual rainfall"
                {...form.getInputProps('climateData.annualRainfall')}
              />
            </Grid.Col>
            <Grid.Col span={{ sm: 12, md: 6 }}>
              <NumberInput
                label="Humidity Levels (%)"
                required
                placeholder="Enter humidity level"
                {...form.getInputProps('climateData.humidityLevels')}
              />
            </Grid.Col>
          </Grid>
          <TextInput
            label="Temperature Range"
            mt="md"
            description={`Enter temperature range in Celsius like "min - max"`}
            required
            placeholder="Enter temperature range"
            {...form.getInputProps('climateData.temperatureRange')}
          />
        </FormComponent>

        {/* Adding Crop Histories Fields */}
        <PageHeaderNew
          pageTitle="Crop Histories"
          hasAddButton
          btnTitle="Add Crop History"
          handleButton={() =>
            form.insertListItem('cropHistory', {
              cropName: '',
              yieldAmount: '',
              plantingDate: '',
              harvestDate: '',
            })
          }
        />
        {form.values.cropHistory.map((history, index) => (
          <Card p={'md'} mx={'mx'} mb="xs" shadow={'sm'} radius="md" withBorder>
            <Grid gutter={'md'}>
              <Grid.Col span={{ sm: 12, md: 6 }}>
                <TextInput
                  label="Crop Name"
                  required
                  placeholder="Enter crop name"
                  {...form.getInputProps(`cropHistory.${index}.cropName`)}
                />
              </Grid.Col>
              <Grid.Col span={{ sm: 12, md: 6 }}>
                <NumberInput
                  label="Yield Amount"
                  required
                  placeholder="Enter yield amount"
                  {...form.getInputProps(`cropHistory.${index}.yieldAmount`)}
                />
              </Grid.Col>
            </Grid>
            <Grid gutter={'md'} my={'md'}>
              <Grid.Col span={{ sm: 12, md: 6 }}>
                <DateInput
                  label="Planting Date"
                  required
                  placeholder="Enter planting date"
                  {...form.getInputProps(`cropHistory.${index}.plantingDate`)}
                />
              </Grid.Col>
              <Grid.Col span={{ sm: 12, md: 6 }}>
                <DateInput
                  label="Harvest Date"
                  required
                  placeholder="Enter harvest date"
                  {...form.getInputProps(`cropHistory.${index}.harvestDate`)}
                />
              </Grid.Col>
            </Grid>
          </Card>
        ))}

        <Group justify="justify-apart" my="xl">
          <Button type="submit">Submit</Button>
        </Group>
      </FormComponent>
    </form>
  );
};
