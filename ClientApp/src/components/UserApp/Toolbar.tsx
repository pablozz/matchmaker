import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar as MaterialToolbar,
  Button,
  Typography
} from '@material-ui/core';
import { ROUTES } from '../../constants/routes';

interface IToolbarProps {
  title: string;
  login: boolean;
}

export const Toolbar: React.FC<IToolbarProps> = props => {
  return (
    <AppBar color="default" position="relative">
      <MaterialToolbar>
        <Typography className="toolbar-title" component="h1" variant="h4">
          {props.title}
        </Typography>
        <Link
          to={ROUTES.Login}
          style={{ textDecoration: 'none', marginLeft: 'auto' }}
          color="inherit"
        >
          {props.login && <Button>Prisijungti</Button>}
        </Link>
      </MaterialToolbar>
    </AppBar>
  );
};
