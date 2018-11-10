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
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Loadable from 'react-loadable';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
/* eslint-disable*/

const TrendingNewsForm = Loadable({
  loader: () => import('./TrendingNewsForm'),
  loading: () => null,
});

const TrendingNewsList = Loadable({
  loader: () => import('./TrendingNewsList'),
  loading: () => null,
});

const AdminTrendingNewsList = Loadable({
  loader: () => import('./AdminTrendingNewsList'),
  loading: () => null,
});

const TrendingNewsView = Loadable({
  loader: () => import('./TrendingNewsView'),
  loading: () => null,
});

/* eslint-disable react/prefer-stateless-function */
export class TrendingNews extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>TrendingNews</title>
          <meta name="description" content="TrendingNews" />
        </Helmet>
        <Switch>
          <PrivateRoute
            exact
            path="/app/news/trends"
            component={TrendingNewsList}
          />
          <PrivateRoute
          exact
          path="/app/news/trends/:trendingNewsId/details"
          component={TrendingNewsView}
        />
          <PrivateRoute
          exact
          path="/app/news/trends/admin/trends"
          component={AdminTrendingNewsList}
        />
          <PrivateRoute
            exact
            path="/app/news/trends/admin/trend/new"
            component={TrendingNewsForm}
          />
        </Switch>
      </div>
    );
  }
}

TrendingNews.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({});

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
