import React from 'react';
import {
  AppBar,
  Toolbar as MaterialToolbar,
  Button,
  Typography
} from '@material-ui/core';

export const Toolbar: React.FC = () => {
  return (
    <AppBar color="default" position="relative">
      <MaterialToolbar>
        <Typography variant="h6">Veiklos</Typography>
        <Button style={{ marginLeft: 'auto' }} color="inherit">
          Prisijungti
        </Button>
      </MaterialToolbar>
    </AppBar>
  );
};
