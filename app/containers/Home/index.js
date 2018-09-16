/**
 *
 * Home
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Switch, Route } from 'react-router-dom';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Drawer from 'components/Drawer';
import makeSelectHome from './selectors';
import reducer from './reducer';
import saga from './saga';

import MobileNavBar from './MobileNavBar';
import AppBottomNavigation from './BottomNavigation';
import HomeCenterMenus from './HomeCenterMenus';
// import BrowserNavbar from './BrowserNavbar';

/* eslint-disable react/prefer-stateless-function */
export class Home extends React.Component {
  state = {
    drawerOpen: false,
  };

  toggleDrawer = opened => {
    this.setState({
      drawerOpen: opened || !this.state.drawerOpen,
    });
  };
  render() {
    return (
      <div style={{ position: 'absolute', height: '100%' }}>
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Description of Home" />
        </Helmet>
        <MobileNavBar toggleDrawer={this.toggleDrawer} />
        <Drawer open={this.state.drawerOpen} toggleDrawer={this.toggleDrawer} />
        <Switch>
          <Route path="/home" component={HomeCenterMenus} />
        </Switch>
        <AppBottomNavigation />
      </div>
    );
  }
}

Home.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  home: makeSelectHome(),
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

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Home);
