import React, { Dispatch, Fragment } from 'react';
import { Redirect } from 'react-router';
import { Toolbar } from '../../Toolbar';
import { TabNavigation } from './TabNavigation';
import { UserRegisteredActivitiesDisplay } from './UserRegisteredActivitiesDisplay';
import { UserCreatedActivitiesDisplay } from './UserCreatedActivitiesDisplay';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../reducers';
import { setMyActivitiesTabStateAction } from '../../../../types/controllers';
import { setMyActivitiesTabState } from '../../../../actions/controllers';
import { ROUTES } from '../../../../constants/routes';
import { useCookies } from 'react-cookie';

export const UserActivities: React.FC = () => {
  const [cookie] = useCookies(['user']);

  // 0 - user's registered activities
  // 1 - user's created activities
  const state: number = useSelector(
    (state: AppState) => state.myActivitiesTabState
  );

  const stateDispatch: Dispatch<setMyActivitiesTabStateAction> = useDispatch();

  const handleChange = (e: any, newValue: React.SetStateAction<number>) => {
    stateDispatch(setMyActivitiesTabState(
      newValue
    ) as setMyActivitiesTabStateAction);
  };

  return (
    <Fragment>
      {!cookie.user && <Redirect to={ROUTES.Main} />}
      <Toolbar title="Mano veiklos" />
      <TabNavigation index={state} onChange={handleChange} />
      {state === 0 && <UserRegisteredActivitiesDisplay />}
      {state === 1 && <UserCreatedActivitiesDisplay />}
    </Fragment>
  );
};
