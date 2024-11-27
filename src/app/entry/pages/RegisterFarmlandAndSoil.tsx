import { Text } from '@mantine/core';
import { DefaultLayout } from '../layout/DefaultLayout';
import { FormProvider } from '../context';
import { MultiStepForm } from '../components/RegisterFarmLand';

export const RegisterFarmlandAndSoilPage = () => {
  return (
    <DefaultLayout>
      <FormProvider>
        <MultiStepForm />
      </FormProvider>
    </DefaultLayout>
  );
};
