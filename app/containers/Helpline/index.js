/**
 *
 * Helpline
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
import makeSelectHelpline from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class Helpline extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Helpline</title>
          <meta name="description" content="Description of Helpline" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

Helpline.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  helpline: makeSelectHelpline(),
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
