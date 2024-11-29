import React from 'react';
import { useForm, yupResolver } from '@mantine/form';
import { Textarea, NumberInput, TextInput, Grid, Button, Group, Switch } from '@mantine/core';
import { useFormContext } from '../../../context';
import { notifications } from '@mantine/notifications';
import * as yup from 'yup';
import { FormComponent } from '../../BasicComponents';
import { useAddFarmlandDetails, useEditFarmlandDetails } from '@farmtech/entry/hooks';
import { AttachmentField } from '@farmtech/shared';

const farmlandFormSchema = yup.object().shape({
  description: yup
    .string()
    .required('Description is required')
    .max(500, 'Description must be 500 characters or less'),
  area: yup.number().required('Area is required').positive('Area must be greater than 0'),
  location: yup.object().shape({
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    country: yup.string().required('Country is required'),
    postalCode: yup.string().required('Postal code is required'),
  }),
  isPublic: yup.boolean().required('Public is required'),
});

export const FarmlandDetailsForm: React.FC<{ nextStep?: () => void; id?: string }> = ({
  nextStep,
  id,
}) => {
  const { farmlandFormData, setFarmlandFormData } = useFormContext();
  const addFarmland = useAddFarmlandDetails();
  const editFarmland = useEditFarmlandDetails(id); // Hook for editing farmland if id is provided
  const form = useForm({
    initialValues: farmlandFormData || {
      description: '',
      image: "",
      area: '',
      location: {
        city: '',
        state: '',
        country: '',
        postalCode: '',
      },
      isPublic: false,
    },
    validate: yupResolver(farmlandFormSchema),
  });

  const handleSubmit = (values: any) => {
    const { description, image, area, location, isPublic } = values;
    if (id) {
      // If id is provided, call editFarmland instead of addFarmland
      editFarmland.mutate({ id, description, image, area, location, isPublic }, {
        onSuccess: (data: any) => {
          if (nextStep) {
            nextStep();
          }
          setFarmlandFormData(data.data);
          notifications.show({
            color: 'blue',
            title: 'Success',
            message: 'Farmland details updated successfully.',
          });
        },
        onError: (err: any) => {
          notifications.show({
            color: 'red',
            title: 'Error',
            message: err?.message
              ? err?.message
              : 'Failed to update farmland details! Please try again later',
          });
        },
      });
    } else {
      // If id is not provided, call addFarmland
      addFarmland.mutate({ description, image, area, location, isPublic }, {
        onSuccess: (data: any) => {
          console.log('farmland add data', data);
          if (nextStep) {
            nextStep();
          }
          setFarmlandFormData(data.data.data);
          notifications.show({
            color: 'blue',
            title: 'Success',
            message: 'Farmland details saved successfully.',
          });
        },
        onError: (err: any) => {
          notifications.show({
            color: 'red',
            title: 'Error',
            message: err?.message
              ? err?.message
              : 'Failed to save farmland details! Please try again later',
          });
        },
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <FormComponent title={'Farmland Details'}>
        <Textarea
          my={'sm'}
          label="Description"
          placeholder="E.g., Fertile land near the river, used for growing rice."
          required
          {...form.getInputProps('description')}
          autosize
          minRows={3}
          maxRows={6}
        />
        <AttachmentField
          name="image"
          form={form}
          label="Farmland Image"
          imageStoreName="imageFile"
          isimageonly={true}
          placeholder="Farmland Image"
          error={form.errors.hasOwnProperty('image')}
          withAsterisk
          mb="md"
        />

        <Grid gutter={'md'}>
          <Grid.Col span={{ sm: 12, md: 6 }}>
            <TextInput
              label="City"
              placeholder="City"
              required
              {...form.getInputProps('location.city')}
            />
          </Grid.Col>
          <Grid.Col span={{ sm: 12, md: 6 }}>
            <TextInput
              label="State"
              placeholder="State"
              required
              {...form.getInputProps('location.state')}
            />
          </Grid.Col>
        </Grid>

        <Grid gutter={'md'}>
          <Grid.Col span={{ sm: 12, md: 6 }}>
            <TextInput
              label="Country"
              placeholder="Country"
              required
              {...form.getInputProps('location.country')}
            />
          </Grid.Col>
          <Grid.Col span={{ sm: 12, md: 6 }}>
            <TextInput
              label="Postal Code"
              placeholder="Postal Code"
              required
              {...form.getInputProps('location.postalCode')}
            />
          </Grid.Col>
        </Grid>
        <Grid gutter={'md'}>
          <Grid.Col span={{ sm: 12, md: 6 }}>
            <NumberInput
              label="Area"
              required
              placeholder="Enter area"
              {...form.getInputProps('area')}
              min={0.1}
              step={0.1}
            />
          </Grid.Col>
        </Grid>
        <Switch
          label="Is Public"
          my={'md'}
          {...form.getInputProps('isPublic')}
          checked={form.values.isPublic}
        />

        <Group justify="left" mt="xl">
          <Button type="submit">{nextStep ? 'Save and continue' : 'Submit'}</Button>
        </Group>
      </FormComponent>
    </form>
  );
};
