import React, { Fragment, useState } from 'react';
import { Link, Paper, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@mdi/react';
import { ROUTES } from '../../../../constants/routes';
import { mdiPlusCircleOutline } from '@mdi/js';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  activity: {
    cursor: 'pointer',
    userSelect: 'none'
  },
  addActivityCard: {
    margin: theme.spacing(2)
  },
  cardElement: {
    padding: theme.spacing(1)
  },
  cardText: {
    fontWeight: 'bold',
    margin: theme.spacing(3)
  }
})); 

export const AddActivity: React.FC = () => {
  const classes = useStyles();
  const [brightness, setBrightness] = useState<string>('brightness(100%)');
  const [elevation, setElevation] = useState<number>(1);
  const [newActivity, setNewActivity] = useState<boolean>(false);

  return (
    <Fragment>
      {newActivity && <Redirect to={ROUTES.AddActivity} />}
      <Link
        className={classes.activity}
        underline="none"
        onMouseOver={() => {
          setBrightness('brightness(90%)');
          setElevation(3);
        }}
        onMouseOut={() => {
          setBrightness('brightness(100%)');
          setElevation(1);
        }}
      >
        <Paper className={classes.addActivityCard}
          style={{
            filter: brightness
          }}
          elevation={elevation}
          onClick={() => setNewActivity(true)}
        >
          <Grid container justify="space-between">
            <Grid item className={classes.cardElement}>
              <Typography className={classes.cardText} variant="h5">Nauja veikla</Typography>
            </Grid>
            <Grid item className={classes.cardElement}>
              <Icon title="AddIcon" size={3} path={mdiPlusCircleOutline} />
            </Grid>
          </Grid>
        </Paper>
      </Link>
    </Fragment>
  );
}
  