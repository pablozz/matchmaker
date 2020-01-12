import React from 'react';
import { Grid, ListItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  getFullDate,
  getTimeString
} from '../../../../scripts/datetime-formats';

const useStyles = makeStyles(theme => ({
  item: {
    padding: theme.spacing(1.5)
  }
}));

interface IUerActivityListItemProps {
  datetime: number;
  playground: string;
}

export const UserActivityListItem: React.FC<
  IUerActivityListItemProps
> = props => {
  const classes = useStyles();
  return (
    <div>
      <ListItem button className={classes.item}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Typography>{getFullDate(props.datetime)}</Typography>
            <Typography variant="body2" color="textPrimary">
              {getTimeString(props.datetime)}
            </Typography>
          </Grid>
          <Grid item>
            <Typography component="span" variant="body2">
              {props.playground}
            </Typography>
          </Grid>
        </Grid>
      </ListItem>
    </div>
  );
};
