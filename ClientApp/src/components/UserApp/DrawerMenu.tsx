import React, { useState, Fragment, Dispatch } from 'react';
import { useCookies } from 'react-cookie';
import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@mdi/react';
import { mdiHome, mdiLogout, mdiLogin, mdiBasketball } from '@mdi/js';
import {
  setLoadedOrErrorActivities,
  setUserActivities
} from '../../actions/activities';
import { IActivityAction, IUserActivityAction } from '../../types/activities';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(theme => ({
  userData: {
    padding: theme.spacing(3)
  },
  list: {
    width: theme.spacing(30)
  }
}));

interface IDrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DrawerMenu: React.FC<IDrawerMenuProps> = props => {
  const [cookie,, removeCookie] = useCookies(['user']);
  const [redirectToMain, setRedirectToMain] = useState<boolean>(false);
  const [redirectToLogin, setRedirectToLogin] = useState<boolean>(false);

  const userActivityDispatch: Dispatch<IUserActivityAction> = useDispatch();
  const activityDispatch: Dispatch<IActivityAction> = useDispatch();

  const classes = useStyles();

  const handleLogOut = async () => {
    removeCookie('user');
    userActivityDispatch(await setUserActivities(''));
    activityDispatch(await setLoadedOrErrorActivities());
  };

  return (
    <Fragment>
      {redirectToMain && <Redirect to="/" />}
      {redirectToLogin && <Redirect to="/login" />}
      <Drawer open={props.isOpen} onClose={props.onClose}>
        {cookie.user && (
          <div className={classes.userData}>
            <Typography variant="h5">{cookie.user.name}</Typography>
            <Typography variant="subtitle2">{cookie.user.email}</Typography>
          </div>
        )}
        <Divider />
        <div className={classes.list}>
          <List>
            <ListItem button onClick={() => setRedirectToMain(true)}>
              <ListItemIcon>
                <Icon title="Home" size={1} path={mdiHome} />
              </ListItemIcon>
              <ListItemText primary="Pagrindinis" />
            </ListItem>
            {cookie.user && (
              <ListItem button>
                <ListItemIcon>
                  <Icon title="Activities" size={1} path={mdiBasketball} />
                </ListItemIcon>
                <ListItemText primary="Mano veiklos" />
              </ListItem>
            )}
            <Divider />
            {cookie.user ? (
              <ListItem button onClick={() => handleLogOut()}>
                <ListItemIcon>
                  <Icon title="Logout" size={1} path={mdiLogout} />
                </ListItemIcon>
                <ListItemText primary="Atsijungti" />
              </ListItem>
            ) : (
              <ListItem button onClick={() => setRedirectToLogin(true)}>
                <ListItemIcon>
                  <Icon title="Login" size={1} path={mdiLogin} />
                </ListItemIcon>
                <ListItemText primary="Prisijungti" />
              </ListItem>
            )}
          </List>
        </div>
      </Drawer>
    </Fragment>
  );
};
