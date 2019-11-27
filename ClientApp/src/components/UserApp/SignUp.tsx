import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Toolbar } from './Toolbar';
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
  Radio
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ROUTES } from '../../constants/routes';

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
    color: theme.palette.primary.main,
    textDecorationColor: theme.palette.primary.main
  }
}));

interface ITextField {
  value: string;
  error: boolean;
}

export const SignUp = () => {
  const classes = useStyles();

  const [fname, setFName] = useState<ITextField>({ value: '', error: false });
  const [lname, setLName] = useState<ITextField>({ value: '', error: false });
  const [email, setEmail] = useState<ITextField>({ value: '', error: false });
  const [password, setPassword] = useState<ITextField>({
    value: '',
    error: false
  });
  const [gender, setGender] = useState<string>('male');

  const handleSubmit = () => {
    if (!fname.value) setFName({ value: fname.value, error: true });
    if (!lname.value) setLName({ value: lname.value, error: true });
    if (!email.value) setEmail({ value: email.value, error: true });
    if (!password.value) setPassword({ value: password.value, error: true });
  };

  return (
    <Fragment>
      <Toolbar title="Registracija" login={false} />
      <Container maxWidth="xs">
        <div className={classes.paper}>
          <div className={classes.form}>
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
                      value="male"
                      control={<Radio color="primary" />}
                      label="Vyras"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio color="primary" />}
                      label="Moteris"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio color="primary" />}
                      label="Kita"
                    />
                  </Grid>
                </RadioGroup>
              </FormControl>

              <Grid item xs={12}>
                <TextField
                  error={email.error}
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
              color="primary"
              className={classes.submit}
              onClick={() => handleSubmit()}
            >
              Registruotis
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link className={classes.link} to={ROUTES.Login}>
                  <Typography variant="body2">
                    Turi paskyrą? Prisijunk
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};
