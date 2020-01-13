import React, { Dispatch, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../../../reducers';
import { IActivity, IActivityAction } from '../../../../types/activities';
import { setActivity } from '../../../../actions/activities';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Paper, List, Divider, Typography } from '@material-ui/core';
import { MyActivityListItem } from './MyActivityListItem';

import Zoom from '@material-ui/core/Zoom';

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(3, 0, 3, 0)
  },
  empty: {
    marginTop: theme.spacing(3)
  }
}));

export const RegisteredActivitiesDisplay = () => {
  const classes = useStyles();

  const userActivities: IActivity[] = useSelector(
    (state: AppState) => state.userActivities
  );

  const dispatchActivity: Dispatch<IActivityAction> = useDispatch();
  return (
    <Zoom in={true}>
      {userActivities ? (
        <Container maxWidth="xs">
          <Paper className={classes.paper}>
            <List>
              {userActivities.map((activity: IActivity, index: number) => {
                return (
                  <Fragment key={index}>
                    {index !== 0 && <Divider />}
                    <MyActivityListItem
                      datetime={activity.date}
                      playground={activity.playground}
                      category={activity.category}
                      onClick={() => dispatchActivity(setActivity(activity))}
                    />
                  </Fragment>
                );
              })}
            </List>
          </Paper>
        </Container>
      ) : (
        <Typography className={classes.empty} component={'h1'} variant={'h4'}>
          Nesate užsiregistravęs į jokią veiklą
        </Typography>
      )}
    </Zoom>
  );
};
