import React, { MouseEvent, ReactEventHandler } from 'react';
import { Button, useMantineTheme, ButtonProps } from '@mantine/core';
import { Link } from 'react-router-dom';

type OutlinedButtonProps = {
  onClick?: ReactEventHandler;
  buttonText: string;
  link?: string;
} & ButtonProps;

export const OutlinedButton: React.FC<OutlinedButtonProps> = ({
  onClick,
  buttonText,
  link,
  ...props
}) => {
  const theme = useMantineTheme();

  // If both link and onClick are provided
  if (link && onClick) {
    return (
      <Link to={link}>
        <Button variant="outline" color={theme.colors.red[7]} onClick={onClick} {...props}>
          {buttonText}
        </Button>
      </Link>
    );
  }

  // If only link is provided
  if (link) {
    return (
      <Link to={link}>
        <Button variant="outline" color={theme.colors.red[7]} {...props}>
          {buttonText}
        </Button>
      </Link>
    );
  }

  // If only onClick is provided
  return (
    <Button variant="outline" size='sm' color={theme.colors.red[7]} onClick={onClick} {...props}>
      {buttonText}
    </Button>
  );
};
