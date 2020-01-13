import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../reducers';
import { IActivity } from '../../../../types/activities';

import { MyActivitiesDisplay } from './MyActivitiesDisplay';

export const RegisteredActivitiesDisplay = () => {
  const userActivities: IActivity[] = useSelector(
    (state: AppState) => state.userActivities
  );

  return (
    <MyActivitiesDisplay
      activities={userActivities}
      emptyText={'Nesate prisiregistravęs prie veiklų'}
    />
  );
};
