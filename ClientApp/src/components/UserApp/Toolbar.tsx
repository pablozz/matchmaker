import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar as MaterialToolbar,
  Button,
  Typography
} from '@material-ui/core';
import { ROUTES } from '../../constants/routes';
import { useCookies } from 'react-cookie';

interface IToolbarProps {
  title: string;
}

export const Toolbar: React.FC<IToolbarProps> = props => {
  const [cookies, setCookies] = useCookies(['loginToken']);

  return (
    <AppBar color="primary" position="relative">
      <MaterialToolbar>
        <Typography className="toolbar-title" component="h1" variant="h4">
          {props.title}
        </Typography>
        {cookies.loginToken !== '' ? (
          <Button
            color="secondary"
            style={{ marginLeft: 'auto' }}
            onClick={() => setCookies('loginToken', '', { path: '/' })}
          >
            Atsijungti
          </Button>
        ) : (
          <Link
            to={ROUTES.Login}
            style={{ textDecoration: 'none', marginLeft: 'auto' }}
          >
            <Button color="secondary">Prisijungti</Button>
          </Link>
        )}
      </MaterialToolbar>
    </AppBar>
  );
};
