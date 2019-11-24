import React, { useEffect, Dispatch } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../reducers';
import {
  IActivityAction,
  IActivityActionPayload
} from '../../types/activities';
import { setLoadedOrErrorActivities } from '../../actions/activities';
import { ActivityCardsDisplay } from './ActivityCardsDisplay';

export const Main: React.FC = () => {
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
    <div>
      <ActivityCardsDisplay activities={activities} />
    </div>
  );
};
