import React from 'react';
import { Container } from '@material-ui/core';
import { Main } from './Main';
import { Toolbar } from './Toolbar';

export const UserApp: React.FC = () => {
  return (
    <Container maxWidth="xs">
      <Toolbar />
      <Main />
    </Container>
  );
};
