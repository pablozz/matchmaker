import React, { useState, Fragment } from 'react';
import {
  AppBar,
  Toolbar as MaterialToolbar,
  Typography,
  IconButton
} from '@material-ui/core';
import { mdiMenu } from '@mdi/js';
import Icon from '@mdi/react';
import { DrawerMenu } from './DrawerMenu';

interface IToolbarProps {
  title: string;
}

export const Toolbar: React.FC<IToolbarProps> = props => {
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);

  return (
    <Fragment>
      <AppBar color="primary" position="relative">
        <MaterialToolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
          >
            <Icon title="Menu" color="white" size={1.5} path={mdiMenu} />
          </IconButton>
          <Typography component="h1" variant="h5">
            {props.title}
          </Typography>
        </MaterialToolbar>
      </AppBar>
      <DrawerMenu isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} />
    </Fragment>
  );
};
