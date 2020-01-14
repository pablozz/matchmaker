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
import { EditActivityForm } from './AddActivity/EditActivityForm';
import { SuccessfulRedirectFromSignUp } from './SignUp/SuccesfulRedirectFromSignUp';
import { UserActivities } from './User/UserActivities/UserActivities';
import { UserAccount } from './User/UserAccount/UserAccount';
import { ROUTES } from '../../constants/routes';
import { IUserRegisteredActivitiesAction } from '../../types/activities';
import { setUserRegisteredActivities } from '../../actions/activities';

export const UserApp: React.FC = () => {
  const [cookie] = useCookies(['user']);

  const dispatch: Dispatch<IUserRegisteredActivitiesAction> = useDispatch();
  useEffect(() => {
    if (cookie.user) {
      (async () => dispatch(await setUserRegisteredActivities(cookie.user.token)))();
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
        <Route path={ROUTES.SuccessfulRedirectFromSignUp}>
          <SuccessfulRedirectFromSignUp />
        </Route>
        <Route path={ROUTES.AddActivity}>
          <AddActivityForm />
        </Route>
        <Route path={ROUTES.EditActivity}>
          <EditActivityForm />
        </Route>
        <Route path={ROUTES.UserActivities}>
          <UserActivities />
        </Route>
        <Route path={ROUTES.UserAccount}>
          <UserAccount />
        </Route>
        <Route path={ROUTES.Main}>
          <Main />
        </Route>
      </Switch>
    </CookiesProvider>
  );
};
