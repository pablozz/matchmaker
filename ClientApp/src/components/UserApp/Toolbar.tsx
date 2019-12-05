import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar as MaterialToolbar,
  Button,
  Typography
} from '@material-ui/core';
import { AppState } from '../../reducers';
import { ROUTES } from '../../constants/routes';

interface IToolbarProps {
  title: string;
}

export const Toolbar: React.FC<IToolbarProps> = props => {
  const loginToken: string = useSelector((state: AppState) => state.loginToken);

  return (
    <AppBar color="primary" position="relative">
      <MaterialToolbar>
        <Typography className="toolbar-title" component="h1" variant="h4">
          {props.title}
        </Typography>
        <Link
          to={ROUTES.Login}
          style={{ textDecoration: 'none', marginLeft: 'auto' }}
        >
          {!loginToken && <Button color="secondary">Prisijungti</Button>}
        </Link>
      </MaterialToolbar>
    </AppBar>
  );
};
