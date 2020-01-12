import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../reducers';
import { IActivity } from '../../../../types/activities';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Paper, List, Divider } from '@material-ui/core';
import { UserActivityListItem } from './UserActivityListItem';

import Zoom from '@material-ui/core/Zoom';

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(3, 0, 3, 0)
  }
}));

export const RegisteredActivitiesDisplay = () => {
  const classes = useStyles();

  const userActivities: IActivity[] = useSelector(
    (state: AppState) => state.userActivities
  );

  return (
    <Container maxWidth="xs">
      <Zoom in={true}>
        <Paper className={classes.paper}>
          <List>
            {userActivities.map((activity, index) => {
              return (
                <Fragment>
                  {index !== 0 && <Divider />}
                  <UserActivityListItem
                    datetime={activity.date}
                    playground={activity.playground}
                  />
                </Fragment>
              );
            })}
          </List>
        </Paper>
      </Zoom>
    </Container>
  );
};
