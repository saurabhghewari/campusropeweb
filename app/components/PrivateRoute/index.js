/**
 *
 * PrivateRoute
 *
 */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import setupAxiosWithAuthHeader from '../../setup_axios';
import feathersClient from '../../feathers';

/* eslint-disable */
class PrivateRoute extends React.Component {
  renderComponentOrRedirect(props) {
    if (feathersClient.get('user')) {
      const { component: Component } = this.props;
      setupAxiosWithAuthHeader();
      return <Component {...props} />;
    }
    return <Redirect to="/login" />;
  }
  render() {
    const { component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props => this.renderComponentOrRedirect(props)}
      />
    );
  }
}

export default PrivateRoute;
