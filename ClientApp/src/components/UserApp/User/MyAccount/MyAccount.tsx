import React, { Fragment } from 'react';
import { useCookies } from 'react-cookie';
import { Toolbar } from '../../Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Grid,
    Typography,
    Paper
  } from '@material-ui/core';
import { UpdateEmail } from './UpdateEmail';
import { UpdatePassword } from './UpdatePassword';

const useStyles = makeStyles(theme => ({
    paper: {
      padding: theme.spacing(2),
      margin: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
      
    },
    submit: {
      backgroundColor: theme.palette.secondary.main,
      margin: theme.spacing(3, 0, 2)
    },
    heading: {
        padding: theme.spacing(2)
    }
  }));

export const MyAccount: React.FC = () => {
    const [cookie] = useCookies(['user']);
    const classes = useStyles();

    return (
        <Fragment>
        <Toolbar title="Mano paskyra" />

        <Container maxWidth="sm">
        <Paper className={classes.paper}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h4" align="center">{cookie.user.name}</Typography>
                </Grid>

                <Grid item xs={12} sm={3}>
                    <Typography align="right">El. paštas:</Typography>
                </Grid>
                <Grid item xs={12} sm={9}>
                        <Typography>{cookie.user.email}</Typography>
                </Grid>

                <Grid item xs={12} sm={3}>
                    <Typography align="right">Lytis:</Typography>
                </Grid>
                <Grid item xs={12} sm={9}>
                        <Typography>{cookie.user.gender}</Typography>
                </Grid>
            </Grid>
        </Paper>
        </Container>
        
        <Container maxWidth="sm">
         <Paper className={classes.paper}>
                 <Typography gutterBottom variant="h6">Keisti el. pašto adresą</Typography>
                <UpdateEmail />                
        </Paper>
        </Container>

        <Container maxWidth="sm">
        <Paper className={classes.paper}>
            <Typography gutterBottom variant="h6" >Keisti slaptažodį</Typography>
                <UpdatePassword />
        </Paper>
        </Container>
        </Fragment>
    );
};
