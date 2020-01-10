import React, { useState, Fragment, Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import { Paper, Typography, Grid, Link, Snackbar } from '@material-ui/core';
import Icon from '@mdi/react';
import {
  mdiBasketball,
  mdiVolleyball,
  mdiSoccer,
  mdiGenderMale,
  mdiGenderFemale,
  mdiGenderMaleFemale,
  mdiSignalCellular1,
  mdiSignalCellular2,
  mdiSignalCellular3
} from '@mdi/js';
import { makeStyles } from '@material-ui/core/styles';
import { useCookies } from 'react-cookie';
import { 
  REGISTER_ACTIVITY_URL,
  UNREGISTER_ACTIVITY_URL
} from '../../../../constants/urls';
import {
  IUserActivityAction,
  IActivityAction
} from '../../../../types/activities';
import {
  setLoadedOrErrorActivities,
  setUserActivities
} from '../../../../actions/activities';

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

  const userActivityDispatch: Dispatch<IUserActivityAction> = useDispatch();
  const activityDispatch: Dispatch<IActivityAction> = useDispatch();

  const [brightness, changeBrightness] = useState<string>('brightness(100%)');
  const [elevation, changeElevation] = useState<number>(1);
  const [cookies] = useCookies(['loginToken']);
  const [snackbarText, setSnackbarText] = useState<string>('');

  const handleClick = async () => {
    if (cookies.loginToken) {
      if (props.userRegistered) {
        await fetch(UNREGISTER_ACTIVITY_URL + props.id, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + cookies.loginToken
          }
        }).catch(() => {
          alert('Įvyko klaida');
        });
        userActivityDispatch(await setUserActivities(cookies.loginToken));
        activityDispatch(await setLoadedOrErrorActivities());
        setSnackbarText('Registracija atšaukta');
      }
      } else {
        await fetch(REGISTER_ACTIVITY_URL + props.id, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + cookies.loginToken
          }
        }).catch(() => {
          alert('Įvyko klaida');
        });
        userActivityDispatch(await setUserActivities(cookies.loginToken));
        activityDispatch(await setLoadedOrErrorActivities());
        setSnackbarText('Užregistruota');
      }
    } else {
      setSnackbarText(
        'Norėdamas registruotis į veiklą privalote būti prisijungęs'
      );
    }
  };

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
                    <Grid item>{pickCategoryIcon(props.category)}</Grid>
                    <Grid item>{pickGenderIcon(props.gender)}</Grid>
                    <Grid item>{pickLevelIcon(props.playerLevel)}</Grid>
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

const getTimeString = (secs: number) => {
  const t = new Date(secs * 1000);
  let h, m;
  t.getHours() >= 10
    ? (h = t.getHours().toString())
    : (h = '0' + t.getHours().toString());
  t.getMinutes() >= 10
    ? (m = t.getMinutes().toString())
    : (m = '0' + t.getMinutes().toString());
  return h + ':' + m;
};

const ICON_SIZE = 1.3;

const pickCategoryIcon = (category: string) => {
  switch (category) {
    case 'Krepšinis':
      return <Icon title="Krepšinis" size={ICON_SIZE} path={mdiBasketball} />;
    case 'Tinklinis':
      return <Icon title="Tinklinis" size={ICON_SIZE} path={mdiVolleyball} />;
    case 'Futbolas':
      return <Icon title="Futbolas" size={ICON_SIZE} path={mdiSoccer} />;
    default:
      return;
  }
};

const pickGenderIcon = (gender: string) => {
  switch (gender) {
    case 'Vyrai':
      return <Icon title="Vyrai" size={ICON_SIZE} path={mdiGenderMale} />;
    case 'Moterys':
      return <Icon title="Moterys" size={ICON_SIZE} path={mdiGenderFemale} />;
    case 'Mišri grupė':
      return (
        <Icon title="Mišri grupė" size={ICON_SIZE} path={mdiGenderMaleFemale} />
      );
    default:
      return;
  }
};

const pickLevelIcon = (level: number) => {
  switch (level) {
    case 1:
      return (
        <Icon
          title="Pradedantysis"
          size={ICON_SIZE}
          path={mdiSignalCellular1}
        />
      );
    case 2:
      return (
        <Icon title="Mėgėjas" size={ICON_SIZE} path={mdiSignalCellular2} />
      );
    case 3:
      return (
        <Icon title="Pažengęs" size={ICON_SIZE} path={mdiSignalCellular3} />
      );
    default:
      return;
  }
};
