import React from 'react';
import { useForm, yupResolver } from '@mantine/form';
import { Textarea, NumberInput, TextInput, Grid, Button, Group } from '@mantine/core';
import { useFormContext } from '../../../context';
import { notifications } from '@mantine/notifications';
import * as yup from 'yup';
import { FormComponent } from '../../BasicComponents';
import { useAddFarmlandDetails, useEditFarmlandDetails } from '@farmtech/entry/hooks';

const farmlandFormSchema = yup.object().shape({
  description: yup
    .string()
    .required('Description is required')
    .max(500, 'Description must be 500 characters or less'),
  area: yup.number().required('Area is required').positive('Area must be greater than 0'),
  address: yup.string().required('Full address is required'),
  city: yup.string(),
  state: yup.string(),
  country: yup.string(),
  postalCode: yup.string(),
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
      area: '',
      address: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
    },
    validate: yupResolver(farmlandFormSchema),
  });

  const handleSubmit = (values: any) => {
    const formattedData = {
      description: values.description,
      area: values.area,
      location: {
        address: values.address,
        city: values.city,
        state: values.state,
        country: values.country,
        postalCode: values.postalCode,
      },
    };

    if (id) {
      // If id is provided, call editFarmland instead of addFarmland
      editFarmland.mutate(formattedData, {
        onSuccess: (data: any) => {
          if (nextStep) {
            nextStep();
          }
          setFarmlandFormData(formattedData);
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
      addFarmland.mutate(formattedData, {
        onSuccess: (data: any) => {
          if (nextStep) {
            nextStep();
          }
          setFarmlandFormData(formattedData);
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
          <Grid.Col span={{ sm: 12, md: 6 }}>
            <TextInput
              label="Full Address"
              placeholder="Enter full address"
              required
              {...form.getInputProps('address')}
            />
          </Grid.Col>
        </Grid>

        <Grid gutter={'md'}>
          <Grid.Col span={{ sm: 12, md: 6 }}>
            <TextInput label="City" placeholder="City" {...form.getInputProps('city')} />
          </Grid.Col>
          <Grid.Col span={{ sm: 12, md: 6 }}>
            <TextInput label="State" placeholder="State" {...form.getInputProps('state')} />
          </Grid.Col>
        </Grid>

        <Grid gutter={'md'}>
          <Grid.Col span={{ sm: 12, md: 6 }}>
            <TextInput label="Country" placeholder="Country" {...form.getInputProps('country')} />
          </Grid.Col>
          <Grid.Col span={{ sm: 12, md: 6 }}>
            <TextInput
              label="Postal Code"
              placeholder="Postal Code"
              {...form.getInputProps('postalCode')}
            />
          </Grid.Col>
        </Grid>

        <Group justify="left" mt="xl">
          <Button type="submit">{nextStep ? 'Next' : 'Submit'}</Button>
        </Group>
      </FormComponent>
    </form>
  );
};
