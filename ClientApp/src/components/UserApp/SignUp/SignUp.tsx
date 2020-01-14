import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Toolbar } from '../Toolbar';
import {
  Button,
  TextField,
  Grid,
  Container,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ROUTES } from '../../../constants/routes';
import { REGISTER_URL } from '../../../constants/urls';
import { isEmail } from '../../../scripts/isEmail';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(3, 0, 0, 0)
  },
  formControl: {
    margin: theme.spacing(2, 2, 1, 2),
    width: '100%'
  },
  radioGroup: {
    margin: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  link: {
    color: theme.palette.secondary.main,
    textDecorationColor: theme.palette.secondary.main
  }
}));

interface ITextField {
  value: string;
  error: boolean;
  helperText?: string | undefined;
}

interface IRegisterData {
  Name: string;
  Email: string;
  Password: string;
  // Vyras | Moteris | Kita
  Gender: string;
}

export const SignUp = () => {
  const classes = useStyles();

  const [fname, setFName] = useState<ITextField>({ value: '', error: false });
  const [lname, setLName] = useState<ITextField>({ value: '', error: false });
  const [email, setEmail] = useState<ITextField>({
    value: '',
    error: false,
    helperText: undefined
  });
  const [password, setPassword] = useState<ITextField>({
    value: '',
    error: false,
    helperText: undefined
  });
  const [gender, setGender] = useState<string>('Vyras');
  const [redirect, setRedirect] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!fname.value) setFName({ value: '', error: true });
    if (!lname.value) setLName({ value: '', error: true });
    if (!isEmail(email.value))
      setEmail({
        value: email.value,
        error: true,
        helperText: 'Toks el. pašto adresas neegzistuoja'
      });
    if (password.value.length < 8)
      setPassword({
        value: '',
        error: true,
        helperText: 'Slaptažodį privalo sudaryti ne mažiau nei 8 simboliai'
      });

    const registerObj: IRegisterData = {
      Name: fname.value + ' ' + lname.value,
      Email: email.value,
      Password: password.value,
      Gender: gender
    };

    if (
      fname.value &&
      lname.value &&
      isEmail(email.value) &&
      password.value.length >= 8
    ) {
      const response: Response = await sendForm(REGISTER_URL, registerObj);
      const text = await response.text();

      if (response.statusText === 'Created') setRedirect(true);
      else if (
        response.statusText === 'Bad Request' &&
        text === 'Email is already taken'
      ) {
        setEmail({
          value: email.value,
          error: true,
          helperText: 'Šis el. pašto adresas jau užimtas'
        });
      }
    }
  };

  return (
    <Fragment>
      {redirect && <Redirect to={ROUTES.SuccessfulRedirectFromSignUp} />}
      <Toolbar title="Registracija" />
      <Container maxWidth="xs">
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={fname.error}
                name="firstName"
                variant="outlined"
                fullWidth
                id="firstName"
                label="Vardas*"
                autoComplete="fname"
                autoFocus
                value={fname.value}
                onChange={e =>
                  setFName({ value: e.target.value, error: false })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={lname.error}
                variant="outlined"
                fullWidth
                id="lastName"
                label="Pavardė*"
                name="lastName"
                autoComplete="lname"
                value={lname.value}
                onChange={e =>
                  setLName({ value: e.target.value, error: false })
                }
              />
            </Grid>
            <FormControl className={classes.formControl}>
              <FormLabel component="legend">Lytis</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender"
                value={gender}
                onChange={e => setGender(e.target.value)}
                row
                className={classes.radioGroup}
              >
                <Grid container justify="space-around">
                  <FormControlLabel
                    value="Vyras"
                    control={<Radio color="primary" />}
                    label="Vyras"
                  />
                  <FormControlLabel
                    value="Moteris"
                    control={<Radio color="primary" />}
                    label="Moteris"
                  />
                  <FormControlLabel
                    value="Kita"
                    control={<Radio color="primary" />}
                    label="Kita"
                  />
                </Grid>
              </RadioGroup>
            </FormControl>

            <Grid item xs={12}>
              <TextField
                error={email.error}
                helperText={email.helperText}
                variant="outlined"
                fullWidth
                id="email"
                label="El. paštas*"
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
                helperText={password.helperText}
                variant="outlined"
                fullWidth
                name="password"
                label="Slaptažodis*"
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
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={() => handleSubmit()}
          >
            Registruotis
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link className={classes.link} to={ROUTES.Login}>
                <Typography variant="body2">Turi paskyrą? Prisijunk</Typography>
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Fragment>
  );
};

const sendForm = async (url: string, obj: IRegisterData): Promise<Response> => {
  const response: Response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  });
  return response;
};
