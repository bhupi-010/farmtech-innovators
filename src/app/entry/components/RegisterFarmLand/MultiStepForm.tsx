import React, { useState } from 'react';
import { Stepper, Button, Group } from '@mantine/core';
import {
  FarmlandDetailsForm,
  SoilDetailsForm,
} from './Forms';
import { useTranslation } from 'react-i18next';

export const MultiStepForm: React.FC = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState<number>(0);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const steps = [
    {
      label: "Farm Land Details",
      description: "Enter your farm land details",
      component: <FarmlandDetailsForm nextStep={nextStep} />,
    },
    {
      label: "Soil Details",
      description: "Enter your soil details",
      component: <SoilDetailsForm nextStep={nextStep} prevStep={prevStep} />,
    },
  ];

  return (
    <Stepper
      color="green"
      active={active}
      onStepClick={setActive}
      allowNextStepsSelect={false}
      style={{ minHeight: '100vh' }}
      size="sm"
      m="lg"
    >
      {steps.map((step, index) => (
        <Stepper.Step key={index} label={step.label} description={step.description}>
          {step.component}
        </Stepper.Step>
      ))}
    </Stepper>
  );
};
