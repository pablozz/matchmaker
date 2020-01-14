import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ROUTES } from '../../../constants/routes';
import { useCookies } from 'react-cookie';

const useStyles = makeStyles(theme => ({
  container: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing(5)
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(3, 0, 0, 0)
  }
}));

export const SuccessfulRedirectFromSignUp: React.FC = () => {
  const classes = useStyles();
  const [cookie] = useCookies(['user']);
  return (
    <Fragment>
      {cookie.user && <Redirect to={ROUTES.Main} />}
      <Container className={classes.container} maxWidth="sm">
          <Typography component="h1" variant="h3">
            Registracijai užbaigti paspauskite
            ant aktyvacijos nuorodos, kurią mes išsiuntėme jūsų nurodytu el. pašto adresu.
          </Typography>
      </Container>
    </Fragment>
  );
};
