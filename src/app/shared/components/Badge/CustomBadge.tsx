import { Badge } from '@mantine/core';

const STATUS_MAP: { [key: string]: string } = {
  pending: 'yellow',
  update_requested: 'yellow',
  requested: 'yellow',
  approve: 'green',
  approved: 'green',
  complete: 'green',
  completed: 'green',
  verified: 'green',
  resolved: 'green',
  payment_verified: 'green',
  payment_completed: 'green',
  registered: 'green',
  active: 'green',
  allocated: 'orange',
  initiated: 'orange',
  cancel: 'red',
  cancelled: 'red',
  rejected: 'red',
  failed: 'red',
  payment_failed: 'red',
  verification_failed: 'red',
};

export const CustomBadge = ({ status = 'pending' }) => {
  let label = status?.replace(/_/g, ' ');

  const color = STATUS_MAP[status?.toLowerCase()] ?? 'yellow';

  return (
    <Badge color={color} variant="light">
      {label ?? 'pending'}
    </Badge>
  );
};
