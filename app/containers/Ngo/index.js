/**
 *
 * Ngo
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Switch } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute';
import Content from 'components/Content/Loadable';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Loadable from 'react-loadable';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectNgo from './selectors';
import reducer from './reducer';
import saga from './saga';
import { DAEMON } from '../../utils/constants';
/* eslint-disable*/

const MyNgos = Loadable({
  loader: () => import('./MyNgos'),
  loading: () => null,
});

const AllNgos = Loadable({
  loader: () => import('./AllNgos'),
  loading: () => null,
});

const NewNgo = Loadable({
  loader: () => import('./NewNgo'),
  loading: () => null,
});

/* eslint-disable react/prefer-stateless-function */
export class Ngo extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Ngo</title>
          <meta name="description" content="Description of Ngo" />
        </Helmet>
        <Content>
        <Switch>
          <PrivateRoute path="/app/ngos/new" component={NewNgo} />
          <PrivateRoute path="/app/ngos/my" component={MyNgos} />
          <PrivateRoute exact path="/app/ngos" component={AllNgos} />
        </Switch>
        </Content>
      </div>
    );
  }
}

Ngo.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  ngo: makeSelectNgo(),
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

const withReducer = injectReducer({ key: 'ngo', reducer });
const withSaga = injectSaga({ key: 'ngo', saga,mode:DAEMON});

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Ngo);
