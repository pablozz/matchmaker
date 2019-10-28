import React from 'react';
import { Container } from '@material-ui/core';
import { Activities } from './Activities';

export const UserApp: React.FC = () => {
  return (
    <Container maxWidth="xs">
      <h1>Veiklos</h1>
      <Activities />
    </Container>
  );
};
