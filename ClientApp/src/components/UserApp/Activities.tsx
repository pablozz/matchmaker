import React, { useEffect, Dispatch, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../reducers';
import {
  IActivity,
  IActivityAction,
  IActivityActionPayload
} from '../../types/activities';
import { setLoadedOrErrorActivities } from '../../actions/activities';
import { ActivityCard } from './ActivityCard';
import Skeleton from '@material-ui/lab/Skeleton';

export const Activities: React.FC = () => {
  const activities: IActivityActionPayload = useSelector(
    (state: AppState) => state.activities
  );
  const dispatch: Dispatch<IActivityAction> = useDispatch();

  useEffect(() => {
    if (activities.status === 'init') {
      (async () => dispatch(await setLoadedOrErrorActivities()))();
    }
  }, [dispatch, activities.status]);

  if (activities.status === 'loading')
    return (
      <Fragment>
        <Skeleton width="sm" height={100} />
        <br />
        <Skeleton width="sm" height={100} />
        <br />
        <Skeleton width="sm" height={100} />
      </Fragment>
    );
  else if (activities.status === 'loaded') {
    return (
      <Fragment>
        {activities.payload.map((row: IActivity) => {
          return (
            <ActivityCard
              key={row.id}
              date={row.date}
              category={row.category}
              playground={row.playground}
              playerLevel={row.playerLevel}
              gender={row.gender}
              participantsIn={row.users + '/' + row.numberOfParticipants}
            />
          );
        })}
      </Fragment>
    );
  }
  return <h2 className="error">Įvyko klaida :(</h2>;
};
