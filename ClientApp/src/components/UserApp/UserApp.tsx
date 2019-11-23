import React from 'react';
import { Container } from '@material-ui/core';
import { Main } from './Main';

export const UserApp: React.FC = () => {
  return (
    <Container maxWidth="xs">
      <h1>Veiklos</h1>
      <Main />
    </Container>
  );
};
