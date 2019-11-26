import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Toolbar } from './Toolbar';
import { ROUTES } from '../../constants/routes';

export const Login: React.FC = () => {
  return (
    <Fragment>
      <Toolbar title="Prisijungimas" login={false} />
      <Link to={ROUTES.SignUp}>Registracija</Link>
    </Fragment>
  );
};
