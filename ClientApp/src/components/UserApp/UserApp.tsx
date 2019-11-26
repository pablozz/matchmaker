import React from 'react';
import { Switch, Route } from 'react-router-dom';
import '../../styles/UserApp/UserApp.scss';
import { Main } from './Main/Main';
import { Login } from './Login';
import { SignUp } from './SignUp';
import { ROUTES } from '../../constants/routes';

export const UserApp: React.FC = () => {
  return (
    <Switch>
      <Route path={ROUTES.Login}>
        <Login />
      </Route>
      <Route path={ROUTES.SignUp}>
        <SignUp />
      </Route>
      <Route path={ROUTES.Home}>
        <Main />
      </Route>
    </Switch>
  );
};
