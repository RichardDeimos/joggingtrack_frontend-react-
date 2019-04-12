import React from 'react';  
import { Redirect, Route } from 'react-router-dom';
import { checkLocalStorage } from '../utils/localStorage';

const PrivateRoute = ({ component: Component, ...rest }) => (  
  <Route { ...rest } render={props => (
    checkLocalStorage() ? (
      <Component { ...props } />
    ) : (
      <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}
      />
    )
  )} />
);

export default PrivateRoute;