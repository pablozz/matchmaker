import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { CHANGE_PASSWORD_URL } from '../../../../constants/urls';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Grid, Snackbar } from '@material-ui/core';

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

interface IPasswordData {
  oldPassword: string;
  newPassword: string;
}

export const UpdatePassword: React.FC = () => {
  const [cookie] = useCookies(['user']);
  const [snackbarText, setSnackbarText] = useState<string>('');

  const [oldPassword, setOldPassword] = useState<ITextField>({
    value: '',
    error: false,
    helperText: undefined
  });
  const [newPassword1, setNewPassword1] = useState<ITextField>({
    value: '',
    error: false,
    helperText: undefined
  });
  const [newPassword2, setNewPassword2] = useState<ITextField>({
    value: '',
    error: false,
    helperText: undefined
  });

  const handleSubmit = async () => {
    if (!oldPassword.value)
      setOldPassword({ value: oldPassword.value, error: true });
    if (!newPassword1.value)
      setNewPassword1({ value: newPassword1.value, error: true });
    if (!newPassword2.value)
      setNewPassword2({ value: newPassword2.value, error: true });
    if (newPassword1.value.length < 8)
      setNewPassword1({
        value: newPassword1.value,
        error: true,
        helperText: 'Slaptažodį privalo sudaryti ne mažiau nei 8 simboliai'
      });
    if (newPassword1.value !== newPassword2.value)
      setNewPassword2({
        value: oldPassword.value,
        error: true,
        helperText: 'Slaptažodžiai nesutampa'
      });

    if (
      !oldPassword.error &&
      !newPassword1.error &&
      !newPassword2.error &&
      newPassword1.value.length > 7 &&
      newPassword1.value === newPassword2.value
    ) {
      const passwordObj: IPasswordData = {
        oldPassword: oldPassword.value,
        newPassword: newPassword1.value
      };
      const response: Response = await sendForm(
        CHANGE_PASSWORD_URL,
        passwordObj,
        cookie.user.token
      );
      const text = await response.text();

      if (response.statusText === 'No Content') {
        setSnackbarText('Slaptažodis sėkmingai pakeistas');
      } else if (
        response.statusText === 'Bad Request' &&
        text === 'Old password does not match current password'
      ) {
        setSnackbarText('Neteisingas senas slaptažodis');
      }
    }
  };

  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          error={oldPassword.error}
          variant="outlined"
          fullWidth
          value={oldPassword.value}
          name="oldPassword"
          type="password"
          label="Senas slaptažodis"
          id="oldPassword"
          helperText={oldPassword.helperText}
          onChange={e =>
            setOldPassword({ value: e.target.value, error: false })
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          error={newPassword1.error}
          variant="outlined"
          fullWidth
          type="password"
          value={newPassword1.value}
          name="newPassword1"
          label="Naujas slaptažodis"
          id="newPassword1"
          helperText={newPassword1.helperText}
          onChange={e =>
            setNewPassword1({ value: e.target.value, error: false })
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          error={newPassword2.error}
          variant="outlined"
          fullWidth
          value={newPassword2.value}
          name="newPassword2"
          type="password"
          label="Pakartokite naują slaptažodį"
          id="newPassword2"
          helperText={newPassword2.helperText}
          onChange={e =>
            setNewPassword2({ value: e.target.value, error: false })
          }
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
  obj: IPasswordData,
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
