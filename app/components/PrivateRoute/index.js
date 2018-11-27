/**
 *
 * PrivateRoute
 *
 */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import ls from 'local-storage';
import setupAxiosWithAuthHeader from '../../setup_axios';
import { USER_TOKEN } from '../../constants/local_storage_constants';

/* eslint-disable */
class PrivateRoute extends React.Component {
  renderComponentOrRedirect(props) {
    if (ls.get(USER_TOKEN)) {
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
