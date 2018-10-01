/**
 *
 * TrendingNews
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
import makeSelectTrendingNews from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class TrendingNews extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>TrendingNews</title>
          <meta name="description" content="Description of TrendingNews" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

TrendingNews.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  trendingnews: makeSelectTrendingNews(),
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

const withReducer = injectReducer({ key: 'trendingNews', reducer });
const withSaga = injectSaga({ key: 'trendingNews', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TrendingNews);
