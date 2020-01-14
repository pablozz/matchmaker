import React, { Dispatch, useEffect } from 'react';
import {
  IActivity,
  IUserCreatedActivitiesAction
} from '../../../../types/activities';
import { setUserCreatedActivities } from '../../../../actions/activities';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { AppState } from '../../../../reducers';
import { UserActivityList } from './UserActivityList';

export const UserCreatedActivitiesDisplay = () => {
  const [cookie] = useCookies(['user']);

  const userCreatedActivities: IActivity[] = useSelector(
    (state: AppState) => state.userCreatedActivities
  );

  const dispatchUserCreatedActivities: Dispatch<
    IUserCreatedActivitiesAction
  > = useDispatch();
  useEffect(() => {
    (async () => {
      dispatchUserCreatedActivities(
        await setUserCreatedActivities(cookie.user.token)
      );
    })();
  });

  return (
    <UserActivityList
      activities={userCreatedActivities}
      emptyText={'Nesate sukūręs veiklų'}
    />
  );
};
