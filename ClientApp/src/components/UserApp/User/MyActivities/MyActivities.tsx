import React, { Fragment } from 'react';
import { Toolbar } from '../../Toolbar';
import { TabNavigation } from './TabNavigation';
import { RegisteredActivitiesDisplay } from './RegisteredActivitiesDisplay';

export const MyActivities: React.FC = () => {
  // 0 - user's registered activities
  // 1 - user's created activities
  const [state, setState] = React.useState<number>(0);

  const handleChange = (e: any, newValue: React.SetStateAction<number>) => {
    setState(newValue);
  };

  return (
    <Fragment>
      <Toolbar title="Mano veiklos" />
      <TabNavigation index={state} onChange={handleChange} />
      {state === 0 && <RegisteredActivitiesDisplay />}
    </Fragment>
  );
};
