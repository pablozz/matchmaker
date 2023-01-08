import React, { Fragment, Dispatch } from 'react';
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
import { Link } from 'react-router-dom';
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
  },
  link: {
    color: 'black',
    textDecoration: 'none'
  }
}));

interface IDrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DrawerMenu: React.FC<IDrawerMenuProps> = props => {
  const [cookie, , removeCookie] = useCookies(['user']);

  const userActivityDispatch: Dispatch<IUserRegisteredActivitiesAction> =
    useDispatch();
  const activityDispatch: Dispatch<IActivitiesAction> = useDispatch();

  const classes = useStyles();

  const handleLogOut = async () => {
    removeCookie('user');
    userActivityDispatch(await setUserRegisteredActivities(''));
    activityDispatch(await setLoadedOrErrorActivities());
  };

  return (
    <Fragment>
      <Drawer open={props.isOpen} onClose={props.onClose}>
        {cookie.user && (
          <div className={classes.userData}>
            <Typography variant="h5" component="h2">
              {cookie.user.name}
            </Typography>
            <Typography variant="subtitle2">{cookie.user.email}</Typography>
          </div>
        )}
        <Divider />
        <div className={classes.list}>
          <List>
            <Link to={ROUTES.Main} className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <Icon title="Home" size={1} path={mdiHome} />
                </ListItemIcon>
                <ListItemText primary="Pagrindinis" />
              </ListItem>
            </Link>
            {cookie.user && (
              <Link to={ROUTES.UserActivities} className={classes.link}>
                <ListItem button>
                  <ListItemIcon>
                    <Icon title="Activities" size={1} path={mdiBasketball} />
                  </ListItemIcon>
                  <ListItemText primary="Mano veiklos" />
                </ListItem>
              </Link>
            )}
            {cookie.user && (
              <Link to={ROUTES.UserAccount} className={classes.link}>
                <ListItem button>
                  <ListItemIcon>
                    <Icon title="Account" size={1} path={mdiAccount} />
                  </ListItemIcon>
                  <ListItemText primary="Mano paskyra" />
                </ListItem>
              </Link>
            )}
            <Divider />
            {cookie.user ? (
              <ListItem
                button
                onClick={() => handleLogOut()}
                className={classes.link}
              >
                <ListItemIcon>
                  <Icon title="Logout" size={1} path={mdiLogout} />
                </ListItemIcon>
                <ListItemText primary="Atsijungti" />
              </ListItem>
            ) : (
              <Link to={ROUTES.Login} className={classes.link}>
                <ListItem button>
                  <ListItemIcon>
                    <Icon title="Login" size={1} path={mdiLogin} />
                  </ListItemIcon>
                  <ListItemText primary="Prisijungti" />
                </ListItem>
              </Link>
            )}
          </List>
        </div>
      </Drawer>
    </Fragment>
  );
};
