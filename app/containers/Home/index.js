/**
 *
 * Home
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Switch } from 'react-router-dom';
import { BrowserView, MobileView } from 'react-device-detect';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Drawer from 'components/Drawer';
import AdminTask from 'containers/AssignAdminTask/Loadable';
import MyAdminTasks from 'containers/MyAdminTasks/Loadable';
import TrendingNews from 'containers/TrendingNews/Loadable';
import Ngo from 'containers/Ngo';
import Profile from 'containers/UserProfile/Loadable';
import Support from 'containers/Support/Loadable';
import Helpline from 'containers/Helpline/Loadable';
import AboutUs from 'containers/AboutUs/Loadable';
import PrivateRoute from 'components/PrivateRoute/Loadable';
import CenterMenus from 'components/CenterMenus/Loadable';

import makeSelectHome from './selectors';
import makeSelectLoggedUser, {
  makeSelectLoggedUserMenus,
  makeSelectLoggedUserHomeMenus,
} from '../../store/loggeduser/selectors';
import reducer from './reducer';
import saga from './saga';
import { homeMounted } from './actions';

import MobileNavBar from './MobileNavBar';
import AppBottomNavigation from './BottomNavigation';
import BrowserNavbar from './BrowserNavbar';
import { DAEMON } from '../../utils/constants';

/* eslint-disable react/prefer-stateless-function */
export class Home extends React.Component {
  state = {
    drawerOpen: false,
  };

  componentDidMount() {
    this.props.homeMounted();
  }

  toggleDrawer = opened => {
    this.setState({
      drawerOpen: opened || !this.state.drawerOpen,
    });
  };
  render() {
    const { userInfo } = this.props;
    const user = userInfo.user || {};
    return (
      <React.Fragment>
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Description of Home" />
        </Helmet>
        <MobileView>
          <MobileNavBar toggleDrawer={this.toggleDrawer} userInfo={user} />
        </MobileView>
        <BrowserView>
          <BrowserNavbar toggleDrawer={this.toggleDrawer} userInfo={user} />
        </BrowserView>
        <Drawer
          open={this.state.drawerOpen}
          toggleDrawer={this.toggleDrawer}
          dispatch={this.props.dispatch}
          menuItems={this.props.drawerMenus}
        />
        <Switch>
          <PrivateRoute
            exact
            path="/app"
            component={() => <CenterMenus menus={this.props.homeMenus} />}
          />
          <PrivateRoute path="/app/admintaskassignment" component={AdminTask} />
          <PrivateRoute path="/app/my/admintasks" component={MyAdminTasks} />
          <PrivateRoute path="/app/news/trends" component={TrendingNews} />
          <PrivateRoute path="/app/ngos" component={Ngo} />
          <PrivateRoute path="/app/profile/:userId" component={Profile} />
          <PrivateRoute path="/app/support" component={Support} />
          <PrivateRoute path="/app/helpline" component={Helpline} />
          <PrivateRoute path="/app/about" component={AboutUs} />
        </Switch>
        <MobileView>
          <AppBottomNavigation />
        </MobileView>
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  homeMounted: PropTypes.func.isRequired,
  userInfo: PropTypes.object,
  homeMenus: PropTypes.array,
  drawerMenus: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  home: makeSelectHome(),
  userInfo: makeSelectLoggedUser(),
  drawerMenus: makeSelectLoggedUserMenus(),
  homeMenus: makeSelectLoggedUserHomeMenus(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    homeMounted: () => dispatch(homeMounted()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga, mode: DAEMON });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Home);
