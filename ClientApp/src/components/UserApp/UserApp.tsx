import React, { Fragment } from 'react';
import { Container } from '@material-ui/core';
import '../../styles/UserApp/UserApp.scss';
import { Main } from './Main';
import { Toolbar } from './Toolbar';

export const UserApp: React.FC = () => {
  return (
    <Fragment>
      <Toolbar />
      <Container maxWidth="xs">
        <Main />
      </Container>
    </Fragment>
  );
};
