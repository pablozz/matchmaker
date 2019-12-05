import React from 'react';
import { Typography, Container } from '@material-ui/core';
import { LoginForm } from '../Login/LoginForm';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing(5)
  }
}));

export const SuccesfulRedirectFromSignUp: React.FC = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container} maxWidth="sm">
      <Typography component="h1" variant="h3">
        Registracija sėkminga
      </Typography>
      <br />
      <Container maxWidth="xs">
        <LoginForm />
      </Container>
    </Container>
  );
};
