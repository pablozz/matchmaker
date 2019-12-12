import React, { Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar as MaterialToolbar,
  Button,
  Typography
} from '@material-ui/core';
import { IUserActivityAction, IActivityAction } from '../../types/activities';
import { ROUTES } from '../../constants/routes';
import { useCookies } from 'react-cookie';
import {
  setLoadedOrErrorActivities,
  setUserActivities
} from '../../actions/activities';

interface IToolbarProps {
  title: string;
}

export const Toolbar: React.FC<IToolbarProps> = props => {
  const [cookies, setCookies] = useCookies(['loginToken']);

  const userActivityDispatch: Dispatch<IUserActivityAction> = useDispatch();
  const activityDispatch: Dispatch<IActivityAction> = useDispatch();

  const handleLogOut = async () => {
    setCookies('loginToken', '', { path: '/' });
    userActivityDispatch(await setUserActivities(''));
    activityDispatch(await setLoadedOrErrorActivities());
  };

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
            onClick={() => handleLogOut()}
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
