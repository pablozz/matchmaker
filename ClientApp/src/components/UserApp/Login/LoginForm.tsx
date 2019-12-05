import React, { useState, Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import { Button, TextField, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LOGIN_URL } from '../../../constants/urls';
import { setLoginToken } from '../../../actions/login';
import { ILoginToken } from '../../../types/login';

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
  }
}));

interface ITextField {
  value: string;
  error: boolean;
}

interface ILoginData {
  email: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const classes = useStyles();
  const dispatch: Dispatch<ILoginToken> = useDispatch();

  const [email, setEmail] = useState<ITextField>({ value: '', error: false });
  const [password, setPassword] = useState<ITextField>({
    value: '',
    error: false
  });

  const handleSubmit = async () => {
    if (!email.value) setEmail({ value: email.value, error: true });
    if (!password.value) setPassword({ value: password.value, error: true });

    const loginObj: ILoginData = {
      email: email.value,
      password: password.value
    };

    if (email.value && password.value) {
      const response = await login(LOGIN_URL, loginObj);
      if (response.statusText === 'OK') {
        const json = await response.json();
        const token = await json.tokenString;
        dispatch(setLoginToken(token));
      } else if (response.statusText === 'Unauthorized') {
        dispatch(setLoginToken(null));
        alert('Neteisingas el. pašto adresas arba slaptažodis');
      }
    }
  };

  return (
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
              onChange={e => setEmail({ value: e.target.value, error: false })}
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
      </div>
    </div>
  );
};

const login = async (url: string, obj: ILoginData): Promise<Response> => {
  const response: Response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  });
  return response;
};
