import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Typography, Container, Paper } from '@material-ui/core';
import { LoginForm } from '../Login/LoginForm';
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

export const SuccesfulRedirectFromSignUp: React.FC = () => {
  const classes = useStyles();
  const [cookie] = useCookies(['user']);
  return (
    <Fragment>
      {cookie.user && <Redirect to={ROUTES.Main} />}
      <Container className={classes.container} maxWidth="sm">
        <Typography component="h1" variant="h3">
          Registracija sėkminga
        </Typography>
        <br />
        <Container maxWidth="xs">
          <Paper className={classes.paper}>
            <LoginForm />
          </Paper>
        </Container>
      </Container>
    </Fragment>
  );
};
