import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '../styles/App.scss';
import { UserApp } from './UserApp/UserApp';
import { CookiesProvider } from 'react-cookie';

export const App: React.FC = () => {
  return (
    <CookiesProvider>
      <Router>
        <Switch>
          <Route path="/admin">There is going to be an admin app</Route>
          <Route path="/">
            <UserApp />
          </Route>
        </Switch>
      </Router>
    </CookiesProvider>
  );
};
