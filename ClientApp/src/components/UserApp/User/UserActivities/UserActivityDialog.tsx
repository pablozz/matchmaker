import React, { Dispatch, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../reducers';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IActivity, IUserActivitiesAction, IUserCreatedActivitiesAction } from '../../../../types/activities';
import {
  getFullDate,
  getTimeString
} from '../../../../scripts/datetime-formats';
import Icon from '@mdi/react';
import { pickLevelIcon } from '../../../../scripts/getIcons';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { ACTIVITIES_URL, UNREGISTER_ACTIVITY_URL } from '../../../../constants/urls';
import { setUserActivities, setUserCreatedActivities } from '../../../../actions/activities';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
interface IMyActivityDialogProps {
  open: boolean;
  onClose: () => void;
  registeredActivity?: boolean;
}

const useStyles = makeStyles(theme => ({
  gridItem: {
    margin: theme.spacing(1, 0.5, 1, 0.5)
  }
}));

export const MyActivityDialog: React.FC<IMyActivityDialogProps> = props => {
  const [cookie] = useCookies(['user']);
  const activity: IActivity = useSelector((state: AppState) => state.activity);

  const userActivityDispatch: Dispatch<IUserActivitiesAction> = useDispatch();
  const userCreatedActivitiesDispatch: Dispatch<IUserCreatedActivitiesAction> = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const handleUnregister = async () => {
    await fetch(UNREGISTER_ACTIVITY_URL + activity.id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + cookie.user.token
      }
    })
      .then(() => {
        props.onClose();
      })
      .then(async () => {
        userActivityDispatch(await setUserActivities(cookie.user.token));
      })
      .catch(() => {
        alert('Įvyko klaida');
      });
  };

  const showEditForm = () => {
    history.push("/activities/edit");
  }

  const handleRemove = async () => {
    await fetch(ACTIVITIES_URL + '/' + activity.id, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + cookie.user.token
      }
    });
    userCreatedActivitiesDispatch(await setUserCreatedActivities(cookie.user.token));
    props.onClose();
  }

  return (
    <div>
      <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle>{activity.category}</DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item className={classes.gridItem}>
              <Typography variant={'body2'} color={'textSecondary'}>
                Įvykio data ir laikas:
              </Typography>
            </Grid>
            <Grid item className={classes.gridItem}>
              <Typography variant={'body1'} color={'textPrimary'}>
                {getFullDate(activity.date) +
                  ' ' +
                  getTimeString(activity.date)}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item className={classes.gridItem}>
              <Typography variant={'body2'} color={'textSecondary'}>
                Lyties kategorija:{' '}
              </Typography>
            </Grid>
            <Grid item className={classes.gridItem}>
              <Typography>{activity.gender}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item className={classes.gridItem}>
              <Typography variant={'body2'} color={'textSecondary'}>
                Kaina:
              </Typography>
            </Grid>
            <Grid item className={classes.gridItem}>
              <Typography>{activity.price + ' €'}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item className={classes.gridItem}>
              <Typography variant={'body2'} color={'textSecondary'}>
                Dalyvių:
              </Typography>
            </Grid>
            <Grid item className={classes.gridItem}>
              <Typography>
                {activity.users + '/' + activity.numberOfParticipants}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item className={classes.gridItem}>
              <Typography variant={'body2'} color={'textSecondary'}>
                Adresas:
              </Typography>
            </Grid>
            <Grid item className={classes.gridItem}>
              <Typography>{activity.playground}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item className={classes.gridItem}>
              <Typography variant={'body2'} color={'textSecondary'}>
                Žaidimo lygis:
              </Typography>
            </Grid>
            <Grid item className={classes.gridItem}>
              <Icon
                title={pickLevelIcon(activity.playerLevel).title}
                size={1}
                path={pickLevelIcon(activity.playerLevel).path}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          {props.registeredActivity ? (
            <Button
              autoFocus
              onClick={() => handleUnregister()}
              color="primary"
            >
              Išsiregistruoti
            </Button>
          ) : (
            <Fragment>
              <Button
                disabled={activity.users !== 0}
                autoFocus
                onClick={() => showEditForm()}
                color="primary"
              >
                Redaguoti
              </Button>
              <Button
                disabled={activity.users !== 0}
                autoFocus
                onClick={() => handleRemove()}
                color="primary"
              >
                Ištrinti
              </Button>
            </Fragment>
            
          )}
          <Button onClick={props.onClose} color="primary" autoFocus>
            Gerai
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
