import React, { useState, Fragment } from 'react';
import { Grid, ListItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  getFullDate,
  getTimeString
} from '../../../../scripts/datetime-formats';
import { UserActivityDialog } from './UserActivityDialog';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../reducers';

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

export const UserActivityListItem: React.FC<IMyActivityListItemProps> = props => {
  const classes = useStyles();

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const tabState: number = useSelector(
    (state: AppState) => state.myActivitiesTabState
  );

  const handleClick = () => {
    props.onClick();
    setDialogOpen(true);
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
      <UserActivityDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        registeredActivity={tabState === 0}
      />
    </Fragment>
  );
};
