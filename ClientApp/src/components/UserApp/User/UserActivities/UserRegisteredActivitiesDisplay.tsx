import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../reducers';
import { IActivity } from '../../../../types/activities';

import { UserActivityList } from './UserActivityList';

export const UserRegisteredActivitiesDisplay = () => {
  const userActivities: IActivity[] = useSelector(
    (state: AppState) => state.userActivities
  );

  return (
    <UserActivityList
      activities={userActivities}
      emptyText={'Nesate prisiregistravęs prie veiklų'}
    />
  );
};
