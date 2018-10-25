/**
 *
 * Ngo
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
/* eslint-disable*/

/* eslint-disable react/prefer-stateless-function */
export class TrendingNewsList extends React.Component {
  render() {
    return (
      <div>
        AAA
      </div>
    );
  }
}

TrendingNewsList.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({

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

const withReducer = injectReducer({ key: 'trendingNewsList', reducer });
const withSaga = injectSaga({ key: 'trendingNewsList', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TrendingNewsList);
