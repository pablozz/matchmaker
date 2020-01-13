import React, { useEffect, Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { Switch, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import '../../styles/UserApp/UserApp.scss';
import { Main } from './Main/Main';
import { Login } from './Login/Login';
import { SignUp } from './SignUp/SignUp';
import { AddActivityForm } from './AddActivity/AddActivityForm';
import { SuccesfulRedirectFromSignUp } from './SignUp/SuccesfulRedirectFromSignUp';
import { MyActivities } from './User/MyActivities/MyActivities';
import { ROUTES } from '../../constants/routes';
import { IUserActivitiesAction } from '../../types/activities';
import { setUserActivities } from '../../actions/activities';

export const UserApp: React.FC = () => {
  const [cookie] = useCookies(['user']);

  const dispatch: Dispatch<IUserActivitiesAction> = useDispatch();
  useEffect(() => {
    if (cookie.user) {
      (async () => dispatch(await setUserActivities(cookie.user.token)))();
    }
  }, [cookie.user, dispatch]);

  return (
    <CookiesProvider>
      <Switch>
        <Route path={ROUTES.Login}>
          <Login />
        </Route>
        <Route path={ROUTES.SignUp}>
          <SignUp />
        </Route>
        <Route path={ROUTES.SuccesfulRedirectFromSignUp}>
          <SuccesfulRedirectFromSignUp />
        </Route>
        <Route path={ROUTES.AddActivity}>
          <AddActivityForm />
        </Route>
        <Route path={ROUTES.MyActivities}>
          <MyActivities />
        </Route>
        <Route path={ROUTES.Main}>
          <Main />
        </Route>
      </Switch>
    </CookiesProvider>
  );
};
