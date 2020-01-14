import React, { Dispatch, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { IActivity, IActivityAction } from '../../../../types/activities';
import { setActivity } from '../../../../actions/activities';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Paper, List, Divider, Typography } from '@material-ui/core';
import { UserActivityListItem } from './UserActivityListItem';

import Zoom from '@material-ui/core/Zoom';

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(3, 0, 3, 0)
  },
  empty: {
    marginTop: theme.spacing(3)
  }
}));

interface IMyActivitiesDisplayProps {
  activities: IActivity[] | null;
  emptyText: string;
}

export const UserActivityList: React.FC<
  IMyActivitiesDisplayProps
> = props => {
  const classes = useStyles();

  const dispatchActivity: Dispatch<IActivityAction> = useDispatch();

  return (
    <Zoom in>
      {props.activities ? (
        <Container maxWidth="xs">
          <Paper className={classes.paper}>
            <List>
              {props.activities.map((activity: IActivity, index: number) => {
                return (
                  <Fragment key={index}>
                    {index !== 0 && <Divider />}
                    <UserActivityListItem
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
          {props.emptyText}
        </Typography>
      )}
    </Zoom>
  );
};
