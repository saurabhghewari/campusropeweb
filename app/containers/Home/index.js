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
import { BrowserView, MobileView } from 'react-device-detect';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Drawer from 'components/Drawer';
import AdminTask from 'containers/AdminTask/Loadable';

import makeSelectHome from './selectors';
import reducer from './reducer';
import saga from './saga';

import MobileNavBar from './MobileNavBar';
import AppBottomNavigation from './BottomNavigation';
import HomeCenterMenus from './HomeCenterMenus';
import BrowserNavbar from './BrowserNavbar';

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
      <React.Fragment>
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Description of Home" />
        </Helmet>
        <MobileView>
          <MobileNavBar toggleDrawer={this.toggleDrawer} />
        </MobileView>
        <BrowserView>
          <BrowserNavbar toggleDrawer={this.toggleDrawer} />
        </BrowserView>
        <Drawer open={this.state.drawerOpen} toggleDrawer={this.toggleDrawer} />
        <Switch>
          <Route exact path="/app" component={HomeCenterMenus} />
          <Route path="/app/admintask" component={AdminTask} />
        </Switch>
        <MobileView>
          <AppBottomNavigation />
        </MobileView>
      </React.Fragment>
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
