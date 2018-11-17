/**
 *
 * MyAdminTasks
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import CenterMenus from 'components/CenterMenus/Loadable';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectMyAdminTasks from './selectors';
import reducer from './reducer';
import saga from './saga';
import { fetchMyAdminTasks } from './actions';
/* eslint-disable react/prefer-stateless-function */
export class MyAdminTasks extends React.Component {
  componentDidMount() {
    this.props.fetchMyAdminTasks();
  }
  renderAdminTasks() {
    const { myadmintasks } = this.props;
    if (myadmintasks.length === 0) {
      return (
        <Paper>
          <Typography variant="h4">NO ADMIN TASK ASSIGNED FOR YOU</Typography>
        </Paper>
      );
    }
    return <CenterMenus menus={myadmintasks} />;
  }
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>MyAdminTasks</title>
          <meta name="description" content="Description of MyAdminTasks" />
        </Helmet>
        {this.renderAdminTasks()}
      </React.Fragment>
    );
  }
}

MyAdminTasks.propTypes = {
  fetchMyAdminTasks: PropTypes.func.isRequired,
  myadmintasks: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  myadmintasks: makeSelectMyAdminTasks(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchMyAdminTasks: () => dispatch(fetchMyAdminTasks()),
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
