import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useSelector(state => state.auth);
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/auth" />
      }
    />
  );
};

export default PrivateRoute;
