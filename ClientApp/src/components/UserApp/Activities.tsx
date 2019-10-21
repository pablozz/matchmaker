import React, { useEffect, Dispatch } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../reducers';
import {
  IActivity,
  IFetchedActivity,
  IActivityAction,
  IActivityActionPayload
} from '../../types/activities';
import { SET_ACTIVITIES } from '../../constants/action-names';
import { ActivitiesTable } from './ActivitiesTable';

export const Activities: React.FC = () => {
  const activities: IActivityActionPayload = useSelector(
    (state: AppState) => state.activities
  );
  const dispatch: Dispatch<IActivityAction> = useDispatch();

  const generateActivities = (data: IFetchedActivity[]) => {
    const generatedActivities: IActivity[] = data.map(
      (item: IFetchedActivity) => {
        return {
          id: item.activityId,
          date: item.date,
          gender: item.gender,
          price: item.price,
          numberOfParticipants: item.numberOfParticipants,
          playground: item.playgroundId,
          category: item.categoryId,
          admin: item.adminId,
          users: item.users
        };
      }
    );
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

  if (activities.status === 'loading') {
    return <div>{activities.status}</div>;
  } else if (activities.status === 'loaded') {
    return (
      <div>
        <h1>Veiklos</h1>
        <ActivitiesTable />
      </div>
    );
  } else {
    return <div>{activities.status}</div>;
  }
};
