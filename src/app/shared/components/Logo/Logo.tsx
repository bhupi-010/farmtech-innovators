import React from 'react';
import { Image } from '@mantine/core';
import { Link } from 'react-router-dom';

import classes from './Logo.module.css';
import { useMediaQuery } from '@mantine/hooks';

type Props = {
  height?: number | string;
  width?: number | string;
};

export const Logo = (props: Props) => {
  const { height = 50, width = 50 } = props;
  const isMobile = useMediaQuery('(max-width: 37.5em)');

  const logoUrl = '/assets/logo.png';

  return (
    <div className={classes.logo}>
      <Link to="/">
        <Image src={logoUrl} height={isMobile ? 40 : height} width={width} />
      </Link>
    </div>
  );
};
