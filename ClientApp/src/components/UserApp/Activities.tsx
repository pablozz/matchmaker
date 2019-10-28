import React, { useEffect, Dispatch, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../reducers';
import {
  IActivity,
  IActivityAction,
  IActivityActionPayload
} from '../../types/activities';
import { SET_ACTIVITIES } from '../../constants/action-names';
import { ActivityCard } from './ActivityCard';
import Skeleton from '@material-ui/lab/Skeleton';

export const Activities: React.FC = () => {
  const activities: IActivityActionPayload = useSelector(
    (state: AppState) => state.activities
  );
  const dispatch: Dispatch<IActivityAction> = useDispatch();

  const generateActivities = (data: IActivity[]) => {
    const generatedActivities: IActivity[] = data.map((item: IActivity) => {
      return {
        id: item.id,
        date: item.date,
        gender: item.gender,
        price: item.price,
        numberOfParticipants: item.numberOfParticipants,
        playground: item.playground,
        playerLevel: item.playerLevel,
        category: item.category,
        admin: item.admin,
        users: item.users
      };
    });
    return generatedActivities;
  };

  useEffect(() => {
    if (activities.status === 'init') {
      dispatch({
        type: SET_ACTIVITIES,
        payload: { payload: [], status: 'loading' }
      });
      fetch('https://sportmatchmaker.azurewebsites.net/api/activities')
        .then(response => response.json())
        .then(data => {
          const generatedActivities: IActivity[] = generateActivities(data);
          dispatch({
            type: SET_ACTIVITIES,
            payload: { payload: generatedActivities, status: 'loaded' }
          });
        })
        .catch(() => {
          dispatch({
            type: SET_ACTIVITIES,
            payload: { payload: [], status: 'error' }
          });
        });
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
  return <h2>Įvyko klaida :(</h2>;
};
