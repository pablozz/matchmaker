import React, { Fragment, useState } from 'react';
import { Paper, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ROUTES } from '../../../../constants/routes';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  addActivityCard: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
    cursor: 'pointer',
    userSelect: 'none'
  },
  cardElement: {
    padding: theme.spacing(1)
  },
  cardText: {
    fontWeight: 500,
    margin: theme.spacing(1)
  }
}));

export const AddActivity: React.FC = () => {
  const classes = useStyles();
  const [brightness, setBrightness] = useState<string>('brightness(100%)');
  const [elevation, setElevation] = useState<number>(1);

  return (
    <Fragment>
      <Link to={ROUTES.AddActivity}>
        <Paper
          className={classes.addActivityCard}
          style={{
            filter: brightness
          }}
          elevation={elevation}
          onMouseOver={() => {
            setBrightness('brightness(90%)');
            setElevation(3);
          }}
          onMouseOut={() => {
            setBrightness('brightness(100%)');
            setElevation(1);
          }}
        >
          <Grid container justify="center">
            <Grid item className={classes.cardElement}>
              <Typography className={classes.cardText}>
                Įkelti veiklą
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Link>
    </Fragment>
  );
};
