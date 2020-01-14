import React, { Fragment } from 'react';
import { Toolbar } from '../Toolbar';
import { AppState } from '../../../reducers';
import { IActivity } from '../../../types/activities';
import { useSelector } from 'react-redux';
import { ActivityForm } from './ActivityForm';

export const EditActivityForm: React.FC = () => {
  const activity: IActivity = useSelector((state: AppState) => state.activity);
  return (
    <Fragment>
      <Toolbar title="Redaguoti veiklą" />
      <ActivityForm 
        category={activity.category} 
        date={new Date(activity.date * 1000)} 
        gender={activity.gender}
        playground={activity.playground}
        playerLevel={activity.playerLevel}
        numberOfParticipants={activity.numberOfParticipants}
        existingActivity
        activityId={activity.id}
      />
    </Fragment>
  );
}