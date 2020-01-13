import React, { useState, Fragment, Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import { Paper, Typography, Grid, Link, Snackbar } from '@material-ui/core';
import Icon from '@mdi/react';
import { IIcon } from '../../../../types/icons';
import {
  pickCategoryIcon,
  pickGenderIcon,
  pickLevelIcon
} from '../../../../scripts/getIcons';
import { makeStyles } from '@material-ui/core/styles';
import { useCookies } from 'react-cookie';
import {
  REGISTER_ACTIVITY_URL,
  UNREGISTER_ACTIVITY_URL
} from '../../../../constants/urls';
import {
  IUserActivitiesAction,
  IActivitiesAction
} from '../../../../types/activities';
import {
  setLoadedOrErrorActivities,
  setUserActivities
} from '../../../../actions/activities';
import { getTimeString } from '../../../../scripts/datetime-formats';

const useStyles = makeStyles(theme => ({
  activity: {
    cursor: 'pointer',
    userSelect: 'none'
  },
  activityCard: {
    margin: theme.spacing(2)
  },
  cardElement: {
    padding: theme.spacing(1)
  },
  cardTextTime: {
    fontWeight: 'bold'
  }
}));

interface ICardProps {
  id: string;
  category: string;
  date: number;
  participantsIn: string;
  //price: number;
  gender: string;
  playground: string;
  playerLevel: number;
  userRegistered: boolean;
}

export const ActivityCard: React.FC<ICardProps> = props => {
  const classes = useStyles();

  const userActivityDispatch: Dispatch<IUserActivitiesAction> = useDispatch();
  const activityDispatch: Dispatch<IActivitiesAction> = useDispatch();

  const [brightness, changeBrightness] = useState<string>('brightness(100%)');
  const [elevation, changeElevation] = useState<number>(1);
  const [cookie] = useCookies(['user']);
  const [snackbarText, setSnackbarText] = useState<string>('');

  const handleClick = async () => {
    if (cookie.user) {
      // unregister from activity
      if (props.userRegistered) {
        await fetch(UNREGISTER_ACTIVITY_URL + props.id, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + cookie.user.token
          }
        })
          .then(async () => {
            userActivityDispatch(await setUserActivities(cookie.user.token));
            activityDispatch(await setLoadedOrErrorActivities());
          })
          .then(() => {
            setSnackbarText('Registracija atšaukta');
          })
          .catch(() => {
            alert('Įvyko klaida');
          });
      }
      // register to activity
      else {
        await fetch(REGISTER_ACTIVITY_URL + props.id, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + cookie.user.token
          }
        })
          .then(async () => {
            userActivityDispatch(await setUserActivities(cookie.user.token));
            activityDispatch(await setLoadedOrErrorActivities());
          })
          .then(() => {
            setSnackbarText('Registracija įvyko');
          })
          .catch(() => {
            alert('Įvyko klaida');
          });
      }
    } else {
      setSnackbarText(
        'Norėdamas registruotis į veiklą privalote būti prisijungęs'
      );
    }
  };

  const categoryIcon: IIcon = pickCategoryIcon(props.category);
  const genderIcon: IIcon = pickGenderIcon(props.gender);
  const levelIcon: IIcon = pickLevelIcon(props.playerLevel);
  return (
    <Fragment>
      <Link
        className={classes.activity}
        underline="none"
        onMouseOver={() => {
          changeBrightness('brightness(90%)');
          changeElevation(3);
        }}
        onMouseOut={() => {
          changeBrightness('brightness(100%)');
          changeElevation(1);
        }}
      >
        <Paper
          className={classes.activityCard}
          style={{
            filter: brightness,
            backgroundColor: props.userRegistered ? '#aed581' : ''
          }}
          elevation={elevation}
          onClick={() => handleClick()}
        >
          <Grid container justify="space-between" direction="column">
            <Grid item>
              <Grid container justify="space-between" alignItems="center">
                <Grid item className={classes.cardElement}>
                  <Typography variant="h5" className={classes.cardTextTime}>
                    {getTimeString(props.date)}
                  </Typography>
                </Grid>
                <Grid item className={classes.cardElement}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Icon
                        title={categoryIcon.title}
                        size={1.3}
                        path={categoryIcon.path}
                      />
                    </Grid>
                    <Grid item>
                      <Icon
                        title={genderIcon.title}
                        size={1.3}
                        path={genderIcon.path}
                      />
                    </Grid>
                    <Grid item>
                      <Icon
                        title={levelIcon.title}
                        size={1.3}
                        path={levelIcon.path}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container justify="space-between" alignItems="center">
                <Grid item className={classes.cardElement}>
                  <Typography variant="h6">{props.participantsIn}</Typography>
                </Grid>
                <Grid item className={classes.cardElement}>
                  <Typography>{props.playground}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Link>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={snackbarText !== ''}
        autoHideDuration={6000}
        onClose={() => setSnackbarText('')}
        message={<span>{snackbarText}</span>}
      />
    </Fragment>
  );
};
