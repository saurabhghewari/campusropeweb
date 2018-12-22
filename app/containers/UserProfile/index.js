/**
 *
 * UserProfile
 *
 */

import React from 'react';
import classNames from 'classnames';
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

import './user-profile.css';
import ProfileTabType from './components/ProfileTabTypeModel';

const styles = () => ({
  grid2Container: {
    height: '220px',
  },
  topSectionGrid: {
    minHeight: '185px',
  },
  followsCount: {
    paddingRight: '10px',
    color: '#3f56b5',
  },
  followsLabel: {
    color: '#888484',
  },
  profileTabGrid: {
    paddingBottom: '25px',
  },
  profilePaper: {
    padding: '0 20px 10px',
    width: '100%',
  },
  postWrapper: {
    padding: '20px 0',
  },
  followsTypo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

/* eslint react/prop-types: 0 */
/* eslint prettier/prettier: 0 */
/* eslint-disable react/prefer-stateless-function */
export class UserProfile extends React.Component {
  handleProfileTabChange = selectedTab => {
    this.props.onSelectProfileTab(selectedTab);
  };

  handleProfileSave = (values, actions) => {
    const { userId } = this.props.match.params;
    this.props.saveUserProfile({ ...values, userId }, actions);
  };

  componentDidMount() {
    const { userId } = this.props.match.params;
    this.props.fetchUserProfile(userId);
  }

  isOwner() {
    const { userId } = this.props.match.params;
    const user =
      (this.props.loggedUserInfo && this.props.loggedUserInfo.user) || {};
    return user.id === userId;
  }

  render() {
    const TAB_TYPE_MAP = ProfileTabType.typeTypeMap;
    const { classes, selectedTab, userprofileInfo = {} } = this.props;
    const { picture } = userprofileInfo.profileOf || {};

    return (
      <div className="root">
        <Helmet>
          <title>UserProfile</title>

          <meta name="description" content="Description of UserProfile" />
        </Helmet>

        <Paper className={classes.profilePaper}>
          <Grid container className={classes.topSectionGrid}>
            <Grid item xs={6} md={4} lg={4}>
              <div className="avatarWrapper">
                <div className="circleBorder">
                  <Avatar
                    alt="Adelle Charles"
                    src={picture}
                    className="avatar"
                  />
                </div>
              </div>
            </Grid>

            <Grid item xs={6} md={8} lg={8}>
              <div className="userFollowsWrapper">
                <Typography variant="h6">Saif ELiyas</Typography>

                <Typography variant="body1" className={classes.followsTypo}>
                  <span className={classes.followsLabel}>Followers</span>
                  <span className={classes.followsCount}> 1793</span>
                </Typography>

                <Typography variant="body1" className={classes.followsTypo}>
                  <span className={classes.followsLabel}>Followings</span>
                  <span className={classes.followsCount}> 1309</span>
                </Typography>

                {!this.isOwner() ? (
                  <BrowserView viewClassName="userActionWrapper">
                    <Button
                      variant="contained"
                      color="primary"
                      className={classNames(
                        classes.userActionBtn,
                        classes.followBtn,
                      )}
                    >
                      Follow
                    </Button>

                    <Button
                      variant="contained"
                      color="primary"
                      className={classNames(
                        classes.userActionBtn,
                        classes.messageBtn,
                      )}
                    >
                      Message
                    </Button>

                    <Button
                      variant="contained"
                      color="primary"
                      className={classNames(
                        classes.userActionBtn,
                        classes.moreBtn,
                      )}
                    >
                      More
                    </Button>
                  </BrowserView>
                ) : (
                  ''
                )}
              </div>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} md={4} lg={4} className={classes.profileTabGrid}>
              {!this.isOwner() ? (
                <MobileView viewClassName="userActionWrapper">
                  <Button
                    variant="contained"
                    color="primary"
                    className={classNames(
                      classes.userActionBtn,
                      classes.followBtn,
                    )}
                  >
                    Follow
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    className={classNames(
                      classes.userActionBtn,
                      classes.messageBtn,
                    )}
                  >
                    Message
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    className={classNames(
                      classes.userActionBtn,
                      classes.moreBtn,
                    )}
                  >
                    More
                  </Button>
                </MobileView>
              ) : (
                ''
              )}

              <Typography invarient="body2" className="userDetail">
                Software Developer at GMI
              </Typography>

              <Paper square>
                <Tabs
                  value={selectedTab}
                  onChange={(e, value) => this.handleProfileTabChange(value)}
                  indicatorColor="primary"
                  textColor="primary"
                >
                  <Tab label="About" />
                  <Tab label="Achievements" />
                </Tabs>
              </Paper>
            </Grid>

            <Grid
              item
              xs={12}
              md={8}
              lg={8}
              className="margin-auto profileFormSection"
            >
              {selectedTab === TAB_TYPE_MAP.ABOUT_TAB && (
                <AboutUserComponent
                  isOwner={this.isOwner()}
                  handleProfileSave={this.handleProfileSave}
                  userProfile={userprofileInfo}
                  handleCancel={this.handleProfileTabChange}
                />
              )}

              {selectedTab === TAB_TYPE_MAP.POST_TAB && (
                <React.Fragment>
                  <AddPostComponent />

                  <div className={classes.postWrapper}>
                    <PostComponent />
                  </div>
                </React.Fragment>
              )}
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selectedTab: makeSelectSelectedTab(),
  userprofileInfo: makeSelectUserProfileInfo(),
  loggedUserInfo: makeSelectLoggedUser(),
  isLoggedUser: makeSelectIsLoggedUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchUserProfile: userId => dispatch(fetchUserProfile({ userId })),
    saveUserProfile: (payload, actions) =>
      dispatch(saveUserProfile(payload, actions)),
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
