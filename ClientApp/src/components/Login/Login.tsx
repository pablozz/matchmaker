import React, { Fragment } from 'react';
import { Toolbar } from '../UserApp/Toolbar';
import { LoginForm } from './LoginForm';

export const Login: React.FC = () => {
  return (
    <Fragment>
      <Toolbar title="Prisijungimas" login={false} />
      <LoginForm linkToRegister />
    </Fragment>
  );
};
