import React, { useEffect, Dispatch, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { AppState } from '../../../reducers';
import {
  IActivityAction,
  IActivityActionPayload
} from '../../../types/activities';
import { setLoadedOrErrorActivities } from '../../../actions/activities';
import { Container } from '@material-ui/core';
import { Toolbar } from '../Toolbar';
import { ActivityCardsDisplay } from './ActivityCardsDisplay/ActivityCardsDisplay';

const useStyles = makeStyles(theme => ({
  containerMain: {
    marginTop: theme.spacing(4)
  }
}));

export const Main: React.FC = () => {
  const classes = useStyles();

  const activities: IActivityActionPayload = useSelector(
    (state: AppState) => state.activities
  );
  const dispatch: Dispatch<IActivityAction> = useDispatch();

  useEffect(() => {
    if (activities.status === 'init') {
      (async () => dispatch(await setLoadedOrErrorActivities()))();
    }
  }, [dispatch, activities.status]);
  return (
    <Fragment>
      <Toolbar title="Veiklos" />
      <Container className={classes.containerMain} maxWidth="xs">
        <ActivityCardsDisplay activities={activities} />
      </Container>
    </Fragment>
  );
};
