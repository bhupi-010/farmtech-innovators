import { rem, TextInput } from '@mantine/core';
import { IconPhone } from '@tabler/icons-react';

export const PhoneNumberInput = ({ form, name, ...restProps }: any) => {
  const handleChange = (e: any) => {
    const { value } = e.target;
    form.setFieldValue(name, value.slice(0, 10));
  };
  return (
    <TextInput
      type="number"
      min={0}
      minLength={8}
      label="Enter phone number"
      placeholder="Your phone number"
      size="md"
      withAsterisk
      mt="md"
      rightSection={<IconPhone style={{ height: rem(17), width: rem(17) }} />}
      value={form.values[name]}
      {...form.getInputProps(name)}
      onChange={handleChange}
      {...restProps}
    />
  );
};
