import React, { useState, Fragment } from 'react';
import { Grid, ListItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  getFullDate,
  getTimeString
} from '../../../../scripts/datetime-formats';
import { MyActivityDialog } from './MyActivityDialog';

const useStyles = makeStyles(theme => ({
  item: {
    padding: theme.spacing(1.5)
  }
}));

interface IMyActivityListItemProps {
  datetime: number;
  playground: string;
  category: string;
  onClick: () => void;
}

export const MyActivityListItem: React.FC<IMyActivityListItemProps> = props => {
  const classes = useStyles();

  const [isDialog, setDialog] = useState<boolean>(false);

  const handleClick = () => {
    props.onClick();
    setDialog(true);
  };

  return (
    <Fragment>
      <ListItem button onClick={() => handleClick()} className={classes.item}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Typography>{getFullDate(props.datetime)}</Typography>
            <Typography variant="body2" color="textPrimary">
              {getTimeString(props.datetime)}
            </Typography>
          </Grid>
          <Grid item>
            <Typography component="span" variant="body2">
              {props.playground}, {props.category}
            </Typography>
          </Grid>
        </Grid>
      </ListItem>
      <MyActivityDialog open={isDialog} onClose={() => setDialog(false)} />
    </Fragment>
  );
};
