import React from 'react';
import { Box, Loader, Select } from '@mantine/core';
import { useScheme } from '@farmtech/investment';

type Props = {
  form?: any;
  type?: 'unchangeable' | 'changeable';
};

export const SchemeInput = ({ form, type = 'unchangeable' }: Props) => {
  const { schemes, selectedScheme, updateSelectedScheme } = useScheme();

  const schemeOptions =
    schemes?.data.map((scheme: any) => ({
      value: String(scheme.id),
      label: scheme.name,
    })) || [];

  const handleChange = (value: string) => {
    updateSelectedScheme(value);
  };

  return (
    <Box miw={'300px'}>
      {!schemes ? (
        <Loader type="dots" size={15} />
      ) : type === 'unchangeable' ? (
        <Select
          label="Scheme Name"
          placeholder="Enter your scheme name"
          data={schemeOptions}
          value={selectedScheme}
          onChange={handleChange}
          withAsterisk
          disabled
          allowDeselect={false}
          mb="sm"
        />
      ) : (
        <Select
          // variant="unstyled"
          placeholder="Enter your scheme name"
          data={schemeOptions}
          value={selectedScheme}
          onChange={handleChange}
          withAsterisk
          fw={600}
          allowDeselect={false}
        />
      )}
    </Box>
  );
};
