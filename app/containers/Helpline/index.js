/**
 *
 * Helpline
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Switch } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute';
import Loadable from 'react-loadable';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectHelplines } from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */

const HelplineAdd = Loadable({
  loader: () => import('./HelpLineAdd'),
  loading: () => null,
});

const HelplineUserList = Loadable({
  loader: () => import('./HelplineUserList'),
  loading: () => null,
});

const HelplineAdminList = Loadable({
  loader: () => import('./HelplineAdminList'),
  loading: () => null,
});

const HelplineView = Loadable({
  loader: () => import('./HelplineView'),
  loading: () => null,
});

const HelplineEdit = Loadable({
  loader: () => import('./HelplineEdit'),
  loading: () => null,
});

class Helpline extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Helpline</title>
          <meta name="description" content="Description of Helpline" />
        </Helmet>
        <Switch>
          <PrivateRoute exact path="/helpline" component={HelplineUserList} />
          <PrivateRoute
            exact
            path="/helpline/:helplineId/details"
            component={HelplineView}
          />
          <PrivateRoute
            exact
            path="/helpline/:helplineId/admin/edit"
            component={HelplineEdit}
          />
          <PrivateRoute
            exact
            path="/helpline/admin"
            component={HelplineAdminList}
          />
          <PrivateRoute exact path="/helpline/new" component={HelplineAdd} />
        </Switch>
      </div>
    );
  }
}

Helpline.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  helpline: makeSelectHelplines(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'helpline', reducer });
const withSaga = injectSaga({ key: 'helpline', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Helpline);
