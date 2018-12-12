/**
 *
 * AboutAchievementTabs
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { BrowserView, MobileView } from 'react-device-detect';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectUserProfileInfo, makeSelectSelectedTab } from './selectors';
import {
  makeSelectLoggedUser,
  makeSelectIsLoggedUser,
} from '../../store/loggeduser/selectors';
import reducer from './reducer';
import saga from './saga';
import AddPostComponent from './components/NewPost';
import PostComponent from './components/UserPosts';
import AboutUserComponent from './components/About';

import { tabSelectAction, fetchUserProfile, saveUserProfile } from './actions';

const styles = () => ({});

/* eslint-disable  */
export class AboutAchievementTabs extends React.PureComponent {
  handleProfileTabChange = selectedTab => {
    this.props.onSelectProfileTab(selectedTab);
  };

  render() {
    const { classes, selectedTab } = this.props;
    return (
      <div className={classes.root}>
        <Tabs
          value={selectedTab}
          onChange={(e, value) => this.handleProfileTabChange(value)}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="About" />
          <Tab label="Achievements" />
        </Tabs>
        {}
      </div>
    );
  }
}

AboutAchievementTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selectedTab: makeSelectSelectedTab(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSelectProfileTab: selectedTab => dispatch(tabSelectAction(selectedTab)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const componentWithStyles = withStyles(styles)(AboutAchievementTabs);

export default withConnect(componentWithStyles);
