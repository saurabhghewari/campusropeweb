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
import Progress from 'components/Progress/Loadable';
import SnackBar from 'components/SnackBar/Loadable';
import DeleteDialog from 'components/DeleteDialog/Loadable'

import makeSelectHome, {
  makeSelectIsFetchingData,
  makeSelectSnackData,
} from './selectors';
import makeSelectLoggedUser, {
  makeSelectLoggedUserMenus,
  makeSelectLoggedUserHomeMenus,
} from '../../store/loggeduser/selectors';
import reducer from './reducer';
import saga from './saga';
import { homeMounted, closeSnack } from './actions';

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

  onDelete = () => {
    console.log("Yes testing done.")
  }

  render() {
    const { userInfo, isFetchingData, snackData, closeSnackBar } = this.props;
    return (
      <React.Fragment>
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Description of Home" />
        </Helmet>
        <MobileView>
          <MobileNavBar toggleDrawer={this.toggleDrawer} userInfo={userInfo} />
        </MobileView>
        <BrowserView>
          <BrowserNavbar toggleDrawer={this.toggleDrawer} userInfo={userInfo} />
        </BrowserView>
        <Drawer
          open={this.state.drawerOpen}
          toggleDrawer={this.toggleDrawer}
          dispatch={this.props.dispatch}
          menuItems={this.props.drawerMenus}
        />
        {isFetchingData && <Progress />}
        <Switch>
          <PrivateRoute
            exact
            path="/"
            component={() => <CenterMenus menus={this.props.homeMenus} />}
          />
          <PrivateRoute path="/helpline" component={Helpline} />
          <PrivateRoute path="/admintaskassignment" component={AdminTask} />
          <PrivateRoute path="/my/admintasks" component={MyAdminTasks} />
          <PrivateRoute path="/news/trends" component={TrendingNews} />
          <PrivateRoute path="/ngos" component={Ngo} />
          <PrivateRoute path="/profile/:userId" component={Profile} />
          <PrivateRoute path="/support" component={Support} />
          <PrivateRoute path="/about" component={AboutUs} />
        </Switch>
        <MobileView>
          <AppBottomNavigation userInfo={userInfo} />
        </MobileView>
        <SnackBar
          opened={snackData.opened}
          message={snackData.message}
          variant={snackData.variant}
          close={closeSnackBar}
        />
        <DeleteDialog title={"This is test"} confirmationText={"Are you sure you want to delete this resource?"} onDelete = { () => { this.onDelete() } }/>
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
  isFetchingData: PropTypes.bool,
  snackData: PropTypes.object,
  closeSnackBar: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  home: makeSelectHome(),
  userInfo: makeSelectLoggedUser(),
  drawerMenus: makeSelectLoggedUserMenus(),
  homeMenus: makeSelectLoggedUserHomeMenus(),
  isFetchingData: makeSelectIsFetchingData(),
  snackData: makeSelectSnackData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    homeMounted: () => dispatch(homeMounted()),
    closeSnackBar: () => dispatch(closeSnack()),
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
