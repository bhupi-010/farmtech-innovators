import React, { MouseEvent, ReactEventHandler } from 'react';
import { Button, useMantineTheme, ButtonProps } from '@mantine/core';
import { Link } from 'react-router-dom';

type PrimaryButtonProps = {
  onClick?: ReactEventHandler;
  buttonText: string;
  link?: string;
} & ButtonProps;

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
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
        <Button variant="filled"  onClick={onClick} {...props}>
          {buttonText}
        </Button>
      </Link>
    );
  }

  // If only link is provided
  if (link) {
    return (
      <Link to={link}>
        <Button variant="filled"  {...props}>
          {buttonText}
        </Button>
      </Link>
    );
  }
  if (onClick) {
    return (
      <Button variant="filled"  onClick={onClick} {...props}>
        {buttonText}
      </Button>
    );
  }
  return (
    <Button variant="filled" type="submit"  {...props}>
      {buttonText}
    </Button>
  );
};
