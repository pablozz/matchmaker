import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { CHANGE_EMAIL_URL } from '../../../../constants/urls';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Grid, Snackbar } from '@material-ui/core';
import { isEmail } from '../../../../scripts/isEmail';

const useStyles = makeStyles(theme => ({
  submit: {
    backgroundColor: theme.palette.secondary.main,
    margin: theme.spacing(3, 0, 2)
  }
}));

interface ITextField {
  value: string;
  error: boolean;
  helperText?: string | undefined;
}

interface IEmailData {
  newEmail: string;
}

export const UpdateEmail: React.FC = () => {
  const [cookie, setCookie] = useCookies(['user']);
  const [snackbarText, setSnackbarText] = useState<string>('');

  const [newEmail1, setNewEmail1] = useState<ITextField>({
    value: '',
    error: false,
    helperText: undefined
  });
  const [newEmail2, setNewEmail2] = useState<ITextField>({
    value: '',
    error: false,
    helperText: undefined
  });

  const handleSubmit = async () => {
    if (!newEmail1.value) setNewEmail1({ value: newEmail1.value, error: true });
    if (!newEmail2.value) setNewEmail2({ value: newEmail2.value, error: true });
    if (!isEmail(newEmail1.value))
      setNewEmail1({
        value: newEmail1.value,
        error: true,
        helperText: 'Toks el. pašto adresas neegzistuoja'
      });
    if (newEmail1.value !== newEmail2.value)
      setNewEmail2({
        value: newEmail2.value,
        error: true,
        helperText: 'Adresai nesutampa'
      });
    if (newEmail1.value === cookie.user.email)
      setNewEmail1({
        value: newEmail1.value,
        error: true,
        helperText: 'Toks el. pašto adresas jau naudojamas'
      });

    if (
      !newEmail1.error &&
      !newEmail2.error &&
      isEmail(newEmail1.value) &&
      newEmail1.value === newEmail2.value &&
      newEmail1.value !== cookie.user.email
    ) {
      const emailObj: IEmailData = {
        newEmail: newEmail1.value
      };
      const response: Response = await sendForm(
        CHANGE_EMAIL_URL,
        emailObj,
        cookie.user.token
      );

      if (response.statusText === 'No Content') {
        setSnackbarText('El. pašto adresas sėkmingai pakeistas');
        setCookie(
          'user',
          {
            token: cookie.user.token,
            id: cookie.user.id,
            email: newEmail1.value,
            name: cookie.user.name,
            gender: cookie.user.gender,
            role: cookie.user.role
          },
          { path: '/', maxAge: 31536000 }
        );
      }
    }
  };

  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          error={newEmail1.error}
          variant="outlined"
          fullWidth
          value={newEmail1.value}
          name="newEmail1"
          label="Naujas el. paštas"
          id="newEmail1"
          helperText={newEmail1.helperText}
          onChange={e => setNewEmail1({ value: e.target.value, error: false })}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          error={newEmail2.error}
          variant="outlined"
          fullWidth
          value={newEmail2.value}
          name="newEmail2"
          label="Pakartokite naujo el. pašto adresą"
          id="newEmail2"
          helperText={newEmail2.helperText}
          onChange={e => setNewEmail2({ value: e.target.value, error: false })}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => handleSubmit()}
        >
          Patvirtinti
        </Button>
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={snackbarText !== ''}
        autoHideDuration={6000}
        onClose={() => setSnackbarText('')}
        message={<span>{snackbarText}</span>}
      />
    </Grid>
  );
};

const sendForm = async (
  url: string,
  obj: IEmailData,
  token: string
): Promise<Response> => {
  const response: Response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify(obj)
  });
  return response;
};
