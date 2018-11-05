/**
 *
 * UserProfile
 *
 */
import bgImage from 'images/loginbg.jpg';
import followIcon from 'images/follow.svg';
import profileBgImage from 'images/background-image.jpg';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Paper, Grid, Avatar, Typography, Button, Tabs, Tab } from '@material-ui/core';
import { Block, Message } from '@material-ui/icons';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { selectUserProfileInfo, makeSelectSelectedTab } from './selectors';
import reducer from './reducer';
import saga from './saga';
import AboutUserComponent from './AboutUserComponent';
import ProfileTabType from './ProfileTabTypeModel';

import { tabSelectAction } from './actions';
import './user-profile.css';
import '../App/common.css';

const styles = () => ({
  root: {
    margin: '10px auto',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    width: '80%',
    height: '75%',
    alignItems: 'center',
  },
  grid2Container: {
    height: '220px',
  },
  topSectionGrid: {
    minHeight: "250px"
  },
  followsCount: {
    paddingRight: "10px"
  },
  followsLabel: {
    color: "#888484"
  },
  userFollowsWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    paddingLeft: "50px",

    "& p": {
      padding: "15px 0"
    }
  },
  userDetail: {
    paddingBottom: "25px",
    fontSize: "16px",
    paddingTop: "60px"
  },
  profileTabGrid: {
    paddingBottom: "25px"
  }


});

/* eslint react/prop-types: 0 */
/* eslint prettier/prettier: 0 */
/* eslint-disable react/prefer-stateless-function */
export class UserProfile extends React.Component {
  handleProfileTabChange = selectedTab => {
    this.props.onSelectProfileTab(selectedTab);
  };
  render() {
    const TAB_TYPE_MAP = ProfileTabType.typeTypeMap;
    const { classes, dispatch, selectedTab, userprofileInfo = {}, value = 1 } = this.props;

    const followIngLIClassName = classNames({
      [classes.activeTab]: selectedTab === TAB_TYPE_MAP.FOLLOWING_TAB,
      [classes.followerLi]: true,
    });

    const followerLIClassName = classNames({
      [classes.activeTab]: selectedTab === TAB_TYPE_MAP.FOLLOWERS_TAB,
      [classes.followerLi]: true,
    });

    return (
      <div className={classes.root}>
        <Helmet>
          <title>UserProfile</title>

          <meta name="description" content="Description of UserProfile" />
        </Helmet>

        <Grid container className={classes.topSectionGrid}>

          <Grid item xs={6} md={4} lg={4} >
            <div className="avatarWrapper">
              <div className="circleBorder">
                <Avatar
                  alt="Adelle Charles"
                  src={bgImage}
                  className="avatar"
                />
              </div>
            </div>
          </Grid>

          <Grid item xs={6} md={8} lg={8}>
            <div className={classes.userFollowsWrapper}>
              <Typography variant="h6">Saif ELiyas</Typography>

              <Typography variant="body1">
                <span className={classes.followsCount}> 1793</span>
                <span className={classes.followsLabel}>Followers</span>
              </Typography>

              <Typography variant="body1">
                <span className={classes.followsCount}> 1309</span>
                <span className={classes.followsLabel}>Followings</span>
              </Typography>
            </div>
          </Grid>

        </Grid>

        <Grid container>
          <Grid item xs={12} md={4} lg={4} className={classes.profileTabGrid}>
            <Typography invarient="body2" className={classes.userDetail}>Software Developer at GMI</Typography>

            <Paper square>
              <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab label="About" />
                <Tab label="Achievements" />
              </Tabs>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8} lg={8} className="margin-auto profileFormSection">
            {selectedTab === TAB_TYPE_MAP.ABOUT_TAB && <AboutUserComponent userProfile={userprofileInfo} />}
          </Grid>
        </Grid>
      </div>
    );
  }
}

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selectedTab: makeSelectSelectedTab(),
  userprofileInfo: selectUserProfileInfo(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onSelectProfileTab: selectedTab => dispatch(tabSelectAction(selectedTab)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'userProfile', reducer });
const withSaga = injectSaga({ key: 'userProfile', saga });
const componentWithStyles = withStyles(styles)(UserProfile);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(componentWithStyles);
