import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    TextField,
    Grid
  } from '@material-ui/core';

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

export const UpdateEmail: React.FC = () => {
    const [cookie] = useCookies(['user']);

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

        if (!newEmail1.error && !newEmail2.error) {
                // POST new email
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
                    onChange={e =>
                        setNewEmail1({ value: e.target.value, error: false })
                    }
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
                    onChange={e =>
                        setNewEmail2({ value: e.target.value, error: false })
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
         </Grid>
    );
};

const isEmail = (email: string) => {
    const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  };
  