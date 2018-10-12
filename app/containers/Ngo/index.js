/**
 *
 * Ngo
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
import makeSelectNgo from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class Ngo extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Ngo</title>
          <meta name="description" content="Description of Ngo" />
        </Helmet>
        <FormattedMessage {...messages.header} />
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
const withSaga = injectSaga({ key: 'ngo', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Ngo);
