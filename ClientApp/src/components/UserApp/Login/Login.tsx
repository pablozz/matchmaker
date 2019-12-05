import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar } from '../Toolbar';
import { LoginForm } from './LoginForm';
import { ROUTES } from '../../../constants/routes';

const useStyles = makeStyles(theme => ({
  linkToRegister: {
    color: theme.palette.secondary.main,
    textDecorationColor: theme.palette.secondary.main
  }
}));

export const Login: React.FC = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <Toolbar title="Prisijungimas" />
      <Container maxWidth="xs">
        <LoginForm />
        <Grid container justify="flex-end">
          <Grid item>
            <Link className={classes.linkToRegister} to={ROUTES.SignUp}>
              <Typography variant="body2">
                Neturi paskyros? Registruokis
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};
