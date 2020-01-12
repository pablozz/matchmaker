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

export const UpdatePassword: React.FC = () => {
    const [cookie] = useCookies(['user']);
    
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
        if (!oldPassword.value) setOldPassword({ value: oldPassword.value, error: true });
        if (!newPassword1.value) setNewPassword1({ value: newPassword1.value, error: true });
        if (!newPassword2.value) setNewPassword2({ value: newPassword2.value, error: true });
        if (newPassword1.value.length < 8)
            setNewPassword1({
                value: newPassword1.value,
                error: true,
                helperText: 'Slaptažodį privalo sudaryti ne mažiau nei 8 simboliai'
        });
        if (newPassword1.value === cookie.user.password)
            setNewPassword1({
                value: newPassword1.value,
                error: true,
                helperText: 'Slaptažodis užimtas'
        });
        if (newPassword1.value !== newPassword2.value)
            setNewPassword2({
                value: oldPassword.value,
                error: true,
                helperText: 'Slaptažodžiai nesutampa'
        });
        
        if (!oldPassword.error && !newPassword1.error && !newPassword2.error) {
                // POST new password
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
        </Grid>
    );
};
