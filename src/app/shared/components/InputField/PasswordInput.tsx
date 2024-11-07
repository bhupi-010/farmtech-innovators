import { Box, Center, Group, PasswordInput, Progress, Text } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
  return (
    <Text component="div" c={meets ? 'teal' : 'red'} mt={5} size="sm">
      <Center inline>
        {meets ? <IconCheck size="0.9rem" stroke={1.5} /> : <IconX size="0.9rem" stroke={1.5} />}
        <Box ml={7}>{label}</Box>
      </Center>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: 'Includes number' },
  { re: /[a-z]/, label: 'Includes lowercase letter' },
  { re: /[A-Z]/, label: 'Includes uppercase letter' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

function getStrength(password: string) {
  let multiplier = password.length > 8 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}

export const PasswordInputField = ({
  form,
  size = 'md',
  name,
  label,
}: {
  form: any;
  size?: string;
  name?: string;
  label?: string;
}) => {
  const fieldName = name ?? 'password';
  const passwordValue = form.values[fieldName];
  const strength = getStrength(passwordValue);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(form.values[fieldName])}
    />
  ));
  const bars = Array(4)
    .fill(0)
    .map((_, index) => (
      <Progress
        styles={{ section: { transitionDuration: '0ms' } }}
        value={
          passwordValue.length > 0 && index === 0
            ? 100
            : strength >= ((index + 1) / 4) * 100
            ? 100
            : 0
        }
        color={strength > 80 ? 'teal' : strength > 50 ? 'yellow' : 'red'}
        key={index}
        size={4}
      />
    ));

  const handleChange = (e: string) => {
    form.setFieldValue(fieldName, e);
  };

  return (
    <div>
      <PasswordInput
        size={size}
        // value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Enter Your password"
        label={label ? label : 'Password'}
        required
        error={form.errors[fieldName] ? form.errors[fieldName] : null}
      />

      <Group gap={5} grow mt="xs" mb="md">
        {bars}
      </Group>

      <PasswordRequirement
        label="Has at least 8 characters"
        meets={form.values[fieldName].length >= 8}
      />
      {checks}
    </div>
  );
};
