import { useRouteError } from 'react-router-dom';
import { PageNotFound } from './pageNotFound';
import { Error500 } from './error500';
import React from 'react';

export const RootBoundary: React.FC = () => {
  const error: any = useRouteError();
  console.log('error', error);
  
  if (error.status === 404) {
    return <PageNotFound />;
  } else if (error.status === 500) {
    return <Error500 />;
  } else {
    return <Error500  />;
  }
};