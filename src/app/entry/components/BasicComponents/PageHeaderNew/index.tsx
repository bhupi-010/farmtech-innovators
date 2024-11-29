import React from 'react';
import { Button, Group, Stack, Text, Title } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
type ButtonProps = {
  btnTitle?: string;
  btnLink?: string;
  hasIcon?: boolean;
  handleButton?: () => void;
  isDownloadButton?: boolean;
};

type Props = {
  pageTitle: string;
  hasAddButton?: boolean;
  isDownloadButton?: boolean;
  hasIcon?: boolean;
  pageDescription?: string;
  resourceName?: string;
  action?: string;
};


const AddButton: React.FC<ButtonProps> = ({ btnTitle, btnLink, handleButton, hasIcon, isDownloadButton }) => {
 
  return btnLink ? (
    <Button
      leftSection={hasIcon ? <IconPlus size={15} /> : null}
      component={Link}
      to={btnLink}
    >
      {btnTitle}
    </Button>
  ) : (
    <Button leftSection={hasIcon ? <IconPlus size={15} /> : null} onClick={handleButton}>
      {btnTitle}
    </Button>
  );
};

export const PageHeaderNew = ({
  btnTitle,
  btnLink,
  pageTitle,
  hasAddButton = true,
  isDownloadButton = false,
  hasIcon = true,
  pageDescription,
  handleButton,
  resourceName,
  action = 'createAny',
}: Props & ButtonProps) => {
  // const { isAuthorized } = usePermissions(action, resourceName);
  return (
    <Group justify="space-between" pb='sm'>
      <div>
        <Title order={4} pb={3}>
          {pageTitle}
        </Title>
        <Text size="sm" c="dimmed">
          {pageDescription}
        </Text>
      </div>
      {/* description add */}
      {hasAddButton && (
        <AddButton
          btnTitle={btnTitle}
          hasIcon={hasIcon}
          isDownloadButton={isDownloadButton}
          btnLink={btnLink}
          handleButton={handleButton}
        />
      )}
    </Group>
  );
};
