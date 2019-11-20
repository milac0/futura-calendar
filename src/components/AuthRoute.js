import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

 
const AuthRoute = ({ component: Component, isAuthenticated, ...rest }) => {
    return (
        <Route
        {...rest}
        render = {
        props => isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    );
};

AuthRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

export default AuthRoute;