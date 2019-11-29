import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import {
  Button,
  TextField,
  Grid,
  Container,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  linkToRegister: {
    color: theme.palette.secondary.main,
    textDecorationColor: theme.palette.secondary.main
  }
}));

interface ITextField {
  value: string;
  error: boolean;
}

interface ILoginFormProps {
  linkToRegister: boolean;
}

export const LoginForm: React.FC<ILoginFormProps> = props => {
  const classes = useStyles();

  const [email, setEmail] = useState<ITextField>({ value: '', error: false });
  const [password, setPassword] = useState<ITextField>({
    value: '',
    error: false
  });

  const handleSubmit = () => {
    if (!email.value) setEmail({ value: email.value, error: true });
    if (!password.value) setPassword({ value: password.value, error: true });
  };

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <div className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={email.error}
                variant="outlined"
                fullWidth
                autoFocus
                id="email"
                label="El. paštas"
                name="email"
                autoComplete="email"
                value={email.value}
                onChange={e =>
                  setEmail({ value: e.target.value, error: false })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={password.error}
                variant="outlined"
                fullWidth
                name="password"
                label="Slaptažodis"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password.value}
                onChange={e =>
                  setPassword({ value: e.target.value, error: false })
                }
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            color="secondary"
            variant="contained"
            className={classes.submit}
            onClick={() => handleSubmit()}
          >
            Prisijungti
          </Button>
          {props.linkToRegister && (
            <Grid container justify="flex-end">
              <Grid item>
                <Link className={classes.linkToRegister} to={ROUTES.SignUp}>
                  <Typography variant="body2">
                    Neturi paskyros? Registruokis
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          )}
        </div>
      </div>
    </Container>
  );
};
