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
} from '@mantine/core';
import { FormComponent } from '../../BasicComponents';
import * as yup from 'yup';
import { useFormContext } from '@farmtech/entry/context';
import { DateInput } from '@mantine/dates';
import { useAddSoilDetails, useEditSoilDetails } from '@farmtech/entry/hooks';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';

const soilTypeOptions = ['Loamy', 'Clayey', 'Sandy'];
const drainageOptions = ['Well-drained', 'Poorly-drained'];

const defaultSoilValues = {
  soilType: '',
  soilPH: 7,
  organicMatter: 0,
  drainage: '',
  waterRetentionCapacity: '',
  nutrients: {
    N: 0,
    P: 0,
    K: 0,
  },
  // Adding fields for climate data
  annualRainfall: 0,
  temperatureRange: '',
  growingDegreeDays: 0,
  humidityLevels: 0,
  frostFirst: '',
  frostLast: '',

  // Adding fields for water resources
  irrigationMethod: '',
  waterQualityPH: 7,
  waterSalinity: '',
  waterAvailability: false,
  elevation: 0,
  slope: 0,

  // Adding fields for crop histories
  cropHistories: [
    {
      cropName: '',
      yieldAmount: 0,
      plantingDate: '',
      harvestDate: '',
      rotationPlan: {
        next: '',
        afterNext: '',
      },
    },
  ],
};

const SoilDetailsSchema = yup.object().shape({
  soilType: yup.string().required('Soil type is required'),
  soilPH: yup
    .number()
    .required('Soil pH is required')
    .min(1, 'Soil pH must be greater than 1')
    .max(14, 'Soil pH must be less than 14'),
  organicMatter: yup
    .number()
    .required('Organic matter is required')
    .min(0, 'Organic matter must be greater than 0')
    .max(100, 'Organic matter must be less than 100'),
  drainage: yup.string().required('Drainage is required'),
  waterRetentionCapacity: yup
    .number()
    .required('Water retention capacity is required')
    .min(0, 'Water retention capacity must be greater than 0')
    .max(100, 'Water retention capacity must be less than 100'),
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

  // Adding validations for climate data
  annualRainfall: yup
    .number()
    .required('Annual rainfall is required')
    .min(0, 'Annual rainfall must be greater than 0'),
  temperatureRange: yup.string().required('Temperature range is required'),
  growingDegreeDays: yup
    .number()
    .required('Growing degree days is required')
    .min(0, 'Growing degree days must be greater than 0'),
  humidityLevels: yup
    .number()
    .required('Humidity level is required')
    .min(0, 'Humidity level must be greater than 0'),
  frostFirst: yup.date().required('First frost date is required'),
  frostLast: yup.date().required('Last frost date is required'),

  // Adding validations for water resources
  irrigationMethod: yup.string().required('Irrigation method is required'),
  waterQualityPH: yup
    .number()
    .required('Water quality pH is required')
    .min(1, 'Water pH must be greater than 1')
    .max(14, 'Water pH must be less than 14'),
  waterSalinity: yup.string().required('Water salinity is required'),
  waterAvailability: yup.boolean().required('Water availability is required'),
  elevation: yup
    .number()
    .required('Elevation is required')
    .min(0, 'Elevation must be greater than 0'),
  slope: yup.number().required('Slope is required').min(0, 'Slope must be greater than 0'),

  // Adding validations for crop histories
  cropHistories: yup.array().of(
    yup.object().shape({
      cropName: yup.string().required('Crop name is required'),
      yieldAmount: yup
        .number()
        .required('Yield amount is required')
        .min(0, 'Yield amount must be greater than 0'),
      plantingDate: yup.date().required('Planting date is required'),
      harvestDate: yup.date().required('Harvest date is required'),
      rotationPlan: yup.object().shape({
        next: yup.string().required('Next crop is required'),
        afterNext: yup.string().optional(),
      }),
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
  const { soilFormData, setSoilFormData } = useFormContext();
  const form = useForm({
    initialValues: defaultSoilValues,
    validate: yupResolver(SoilDetailsSchema),
  });

  const handleSubmit = (values: typeof defaultSoilValues) => {
    if (id) {
      editSoil.mutate(values, {
        onSuccess: (data: any) => {
          setSoilFormData(values);
          notifications.show({
            color: 'blue',
            title: 'Success',
            message: 'Soil details updated successfully.',
          });
        },
        onError: (err: any) => {
          notifications.show({
            color: 'red',
            title: 'Error',
            message: err?.message
              ? err?.message
              : 'Failed to update soil details! Please try again later',
          });
        },
      });
      return;
    }
    addSoil.mutate(values, {
      onSuccess: (data: any) => {
        setSoilFormData(values);
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
    });
    setSoilFormData(values);
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <FormComponent title="Soil Details">
        <Grid gutter={'md'}>
          <Grid.Col span={{ sm: 12, md: 6 }}>
            <Select
              label="Soil Type"
              required
              placeholder="Select soil type"
              data={soilTypeOptions}
              {...form.getInputProps('soilType')}
            />
          </Grid.Col>
          <Grid.Col span={{ sm: 12, md: 6 }}>
            <NumberInput
              label="Soil pH"
              required
              placeholder="Enter soil pH"
              min={1}
              max={14}
              step={0.1}
              {...form.getInputProps('soilPH')}
            />
          </Grid.Col>
        </Grid>

        <Grid gutter={'md'}>
          <Grid.Col span={{ sm: 12, md: 6 }}>
            <NumberInput
              label="Organic Matter (%)"
              required
              placeholder="Enter organic matter percentage"
              min={0}
              max={100}
              {...form.getInputProps('organicMatter')}
            />
          </Grid.Col>
          <Grid.Col span={{ sm: 12, md: 6 }}>
            <Select
              label="Drainage"
              required
              placeholder="Select drainage type"
              data={drainageOptions}
              {...form.getInputProps('drainage')}
            />
          </Grid.Col>
        </Grid>

        <Group mt={'md'} gap="sm">
          <NumberInput
            label="Water Retention Capacity"
            miw={300}
            required
            placeholder="Enter water retention capacity"
            min={0}
            {...form.getInputProps('waterRetentionCapacity')}
          />
          <Select label="Unit" data={['cm³/cm³']} defaultValue="cm³/cm³" disabled />
        </Group>

        <FormComponent title="Nutrient Levels">
          <SimpleGrid cols={3} spacing="sm">
            <NumberInput
              label="Nitrogen (N)"
              required
              min={0}
              placeholder="N"
              {...form.getInputProps('nutrients.N')}
            />
            <NumberInput
              label="Phosphorus (P)"
              required
              min={0}
              placeholder="P"
              {...form.getInputProps('nutrients.P')}
            />
            <NumberInput
              label="Potassium (K)"
              required
              min={0}
              placeholder="K"
              {...form.getInputProps('nutrients.K')}
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
                {...form.getInputProps('annualRainfall')}
              />
            </Grid.Col>
            <Grid.Col span={{ sm: 12, md: 6 }}>
              <TextInput
                label="Temperature Range"
                required
                placeholder="Enter temperature range"
                {...form.getInputProps('temperatureRange')}
              />
            </Grid.Col>
          </Grid>
          <Grid gutter={'md'}>
            <Grid.Col span={{ sm: 12, md: 6 }}>
              <NumberInput
                label="Growing Degree Days"
                required
                placeholder="Enter growing degree days"
                {...form.getInputProps('growingDegreeDays')}
              />
            </Grid.Col>
            <Grid.Col span={{ sm: 12, md: 6 }}>
              <NumberInput
                label="Humidity Levels (%)"
                required
                placeholder="Enter humidity level"
                {...form.getInputProps('humidityLevels')}
              />
            </Grid.Col>
          </Grid>
          <Grid gutter={'md'}>
            <Grid.Col span={{ sm: 12, md: 6 }}>
              <DateInput label="First Frost Date" required {...form.getInputProps('frostFirst')} />
            </Grid.Col>
            <Grid.Col span={{ sm: 12, md: 6 }}>
              <DateInput label="Last Frost Date" required {...form.getInputProps('frostLast')} />
            </Grid.Col>
          </Grid>
        </FormComponent>

        {/* Adding Water Resources Fields */}
        <FormComponent title="Water Resources">
          <Grid gutter={'md'}>
            <Grid.Col span={{ sm: 12, md: 6 }}>
              <Select
                label="Irrigation Method"
                required
                placeholder="Select irrigation method"
                data={['Drip', 'Sprinkler', 'Flood']}
                {...form.getInputProps('irrigationMethod')}
              />
            </Grid.Col>
            <Grid.Col span={{ sm: 12, md: 6 }}>
              <NumberInput
                label="Water Quality pH"
                required
                placeholder="Enter water quality pH"
                min={1}
                max={14}
                {...form.getInputProps('waterQualityPH')}
              />
            </Grid.Col>
          </Grid>
          <Grid gutter={'md'}>
            <Grid.Col span={{ sm: 12, md: 6 }}>
              <TextInput
                label="Water Salinity"
                required
                placeholder="Enter water salinity"
                {...form.getInputProps('waterSalinity')}
              />
            </Grid.Col>
            <Grid.Col span={{ sm: 12, md: 6 }}>
              <TextInput
                label="Water Availability"
                required
                {...form.getInputProps('waterAvailability')}
              />
            </Grid.Col>
          </Grid>
          <Grid gutter={'md'}>
            <Grid.Col span={{ sm: 12, md: 6 }}>
              <NumberInput
                label="Elevation"
                required
                placeholder="Enter elevation"
                min={0}
                {...form.getInputProps('elevation')}
              />
            </Grid.Col>
            <Grid.Col span={{ sm: 12, md: 6 }}>
              <NumberInput
                label="Slope"
                required
                placeholder="Enter slope"
                min={0}
                {...form.getInputProps('slope')}
              />
            </Grid.Col>
          </Grid>
        </FormComponent>

        {/* Adding Crop Histories Fields */}
        <FormComponent title="Crop Histories">
          {form.values.cropHistories.map((history, index) => (
            <div key={index}>
              <Grid gutter={'md'}>
                <Grid.Col span={{ sm: 12, md: 6 }}>
                  <TextInput
                    label="Crop Name"
                    required
                    placeholder="Enter crop name"
                    {...form.getInputProps(`cropHistories[${index}].cropName`)}
                  />
                </Grid.Col>
                <Grid.Col span={{ sm: 12, md: 6 }}>
                  <NumberInput
                    label="Yield Amount"
                    required
                    placeholder="Enter yield amount"
                    {...form.getInputProps(`cropHistories[${index}].yieldAmount`)}
                  />
                </Grid.Col>
              </Grid>
              <Grid gutter={'md'}>
                <Grid.Col span={{ sm: 12, md: 6 }}>
                  <DateInput
                    label="Planting Date"
                    required
                    placeholder="Enter planting date"
                    {...form.getInputProps(`cropHistories[${index}].plantingDate`)}
                  />
                </Grid.Col>
                <Grid.Col span={{ sm: 12, md: 6 }}>
                  <DateInput
                    label="Harvest Date"
                    required
                    placeholder="Enter harvest date"
                    {...form.getInputProps(`cropHistories[${index}].harvestDate`)}
                  />
                </Grid.Col>
              </Grid>
            </div>
          ))}
        </FormComponent>

        <Group justify="justify-apart" my="xl">
          { prevStep && <Button onClick={prevStep}>Back</Button>}
          <Button type="submit">Submit</Button>
        </Group>
      </FormComponent>
    </form>
  );
};
