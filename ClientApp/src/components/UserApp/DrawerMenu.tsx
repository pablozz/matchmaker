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
import {
  mdiHome,
  mdiLogout,
  mdiLogin,
  mdiBasketball,
  mdiAccount
} from '@mdi/js';
import {
  setLoadedOrErrorActivities,
  setUserRegisteredActivities
} from '../../actions/activities';
import {
  IActivitiesAction,
  IUserRegisteredActivitiesAction
} from '../../types/activities';
import { useDispatch } from 'react-redux';
import { ROUTES } from '../../constants/routes';

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
  const [cookie, , removeCookie] = useCookies(['user']);

  const [redirectToMain, setRedirectToMain] = useState<boolean>(false);
  const [redirectToLogin, setRedirectToLogin] = useState<boolean>(false);
  const [redirectToUserActivities, setRedirectToUserActivities] = useState<
    boolean
  >(false);
  const [redirectToUserAccount, setRedirectToUserAccount] = useState<boolean>(
    false
  );

  const userActivityDispatch: Dispatch<IUserRegisteredActivitiesAction> = useDispatch();
  const activityDispatch: Dispatch<IActivitiesAction> = useDispatch();

  const classes = useStyles();

  const handleLogOut = async () => {
    removeCookie('user');
    userActivityDispatch(await setUserRegisteredActivities(''));
    activityDispatch(await setLoadedOrErrorActivities());
  };

  return (
    <Fragment>
      {redirectToMain && <Redirect to={ROUTES.Main} />}
      {redirectToLogin && <Redirect to={ROUTES.Login} />}
      {redirectToUserActivities && <Redirect to={ROUTES.UserActivities} />}
      {redirectToUserAccount && <Redirect to={ROUTES.UserAccount} />}
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
              <ListItem
                button
                onClick={() => setRedirectToUserActivities(true)}
              >
                <ListItemIcon>
                  <Icon title="Activities" size={1} path={mdiBasketball} />
                </ListItemIcon>
                <ListItemText primary="Mano veiklos" />
              </ListItem>
            )}
            {cookie.user && (
              <ListItem button onClick={() => setRedirectToUserAccount(true)}>
                <ListItemIcon>
                  <Icon title="Account" size={1} path={mdiAccount} />
                </ListItemIcon>
                <ListItemText primary="Mano paskyra" />
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
