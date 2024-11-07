import React from 'react';
import { ActionIcon, Button, Group, Text, Title, Tooltip } from '@mantine/core';
import { IconPlus, IconRefresh } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

type ButtonProps = {
  btnTitle?: string;
  btnLink?: string;
  handleButton?: () => void;
};

type Props = {
  pageTitle: string;
  hasAddButton?: boolean;
  pageDescription?: string;
  resourceName?: string;
  action?: string;
  isRefreshButton?: boolean;
};

const AddButton = ({ btnTitle, btnLink, handleButton }: ButtonProps) =>
  btnLink ? (
    <Button leftSection={<IconPlus size={15} />} component={Link} to={btnLink}>
      {btnTitle}
    </Button>
  ) : (
    <Button leftSection={<IconPlus size={15} />} onClick={handleButton}>
      {btnTitle}
    </Button>
  );

export const PageHeader = ({
  btnTitle,
  btnLink,
  pageTitle,
  hasAddButton = true,
  pageDescription,
  handleButton,
  resourceName,
  action = 'createAny',
  isRefreshButton = false,
}: Props & ButtonProps) => {
  // const { isAuthorized } = usePermissions(action, resourceName);
  return (
    <Group justify="space-between" mb="xl">
      <div>
        <Title order={4} pb={3}>
          {pageTitle}
        </Title>
        <Text size="sm" c="dimmed">
          {pageDescription}
        </Text>
      </div>
      {/* description add */}
      {hasAddButton && isRefreshButton === false && (
        <AddButton btnTitle={btnTitle} btnLink={btnLink} handleButton={handleButton} />
      )}
      {hasAddButton && isRefreshButton && (
        <Tooltip label="Refresh Data">
          <ActionIcon variant="default" size={35} onClick={handleButton}>
            <IconRefresh size={30} color="gray" />
          </ActionIcon>
        </Tooltip> // <AddButton btnTitle={btnTitle} btnLink={btnLink} handleButton={handleButton} />
      )}
    </Group>
  );
};
