import React, { Fragment } from 'react';
import { Toolbar } from '../Toolbar';
import { ActivityForm } from './ActivityForm';

export const AddActivityForm: React.FC = () => {
  return (
    <Fragment>
      <Toolbar title="Pridėti naują veiklą" />
      <ActivityForm 
        category='' 
        date={new Date()} 
        gender='' 
        playground='' 
        playerLevel={2} 
        numberOfParticipants={0}
      />
    </Fragment>
  );
};
