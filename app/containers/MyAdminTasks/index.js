/**
 *
 * MyAdminTasks
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectMyAdminTasks from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class MyAdminTasks extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>MyAdminTasks</title>
          <meta name="description" content="Description of MyAdminTasks" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

MyAdminTasks.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  myadmintasks: makeSelectMyAdminTasks(),
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

const withReducer = injectReducer({ key: 'myAdminTasks', reducer });
const withSaga = injectSaga({ key: 'myAdminTasks', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MyAdminTasks);
