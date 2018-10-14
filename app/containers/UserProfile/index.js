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
import { Paper, Grid, Avatar, Typography, Button } from '@material-ui/core';
import { Block, Message } from '@material-ui/icons';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectUserProfile from './selectors';
import reducer from './reducer';
import saga from './saga';
import AboutUserComponent from './AboutUserComponent';


import './user-profile.css';

const styles = () => ({
  root: {
    margin: '10px auto',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    width: '90%',
    height: '75%',
    alignItems: 'center',
  },
  profileControlWrapper: {
    width: '100%',
  },
  avatarWrapper: {
    padding: '15px 20px',
  },
  grid2Container: {
    height: '200px',
  },
  grid3Container: {
    margin: 0,
  },
  avatar: {
    width: '100px',
    height: '100px',
  },
  profileBtnWrapper: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
  profilePaper: {
    width: '100%',
    background: `url(${profileBgImage})`,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  profileWrapperPapper: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  tabGrid: {
    margin: '0 auto',
    padding: '0 !important',
  },
  followersCount: {
    textAlign: 'center',
  },
  followerLi: {
    flexDirection: 'column',
    paddingTop: '22px !important',
  },
  profileNavUl: {
    margin: 0,
    padding: 0,
    display: 'flex',
    height: '70px',
    alignItems: 'center',

    '& li': {
      listStyleType: 'none',
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px 10px',
      fontSize: '14px',
      color: '#4c4747',
      fontWeight: '700',
      height: '100%',
    },
    '& li:hover': {
      color: '#131315',
      borderBottom: '2px solid #1890ff',
    },
  },
  avaatarGrid: {
    position: 'relative',
  },
  iconUl: {
    margin: 0,
    padding: 0,
    display: 'flex',
    '& li': {
      width: '40px',
      height: '40px',
      marginRight: '10px',
      listStyleType: 'none',
      display: 'inline-block',
    },
    '& button': {
      width: '100%',
      height: '100%',
      minWidth: 0,
    },
  },
  followIcon: {
    width: '80%',
  },
  secondryGrid: {
    height: '100%',
  },
  blockBtn: {
    background: '#ff5e3a',
    color: 'white',
    '&:hover': {
      background: '#e14928',
    },
  },
  messageBtn: {
    background: '#0277BD',
    color: 'white',
    '&:hover': {
      background: '#01579B',
    },
  },
  followBtn: {
    background: '#7c5ac2',
    color: 'white',
    '&:hover': {
      background: '#5f419d',
    },
  },
  aboutGrid: {
    marginTop: '15px',
  },
});

/* eslint react/prop-types: 0 */
/* eslint prettier/prettier: 0 */
/* eslint-disable react/prefer-stateless-function */
export class UserProfile extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Helmet>
          <title>UserProfile</title>

          <meta name="description" content="Description of UserProfile" />
        </Helmet>

        <Paper elevation={1} className={classes.profilePaper}>
          <Grid container className={classes.grid2Container}>
            <Grid item xs={4} md={2} lg={2} className={classes.avaatarGrid}>
              <div className="avatarWrapper">
                <Avatar
                  alt="Adelle Charles"
                  src={bgImage}
                  className={classes.avatar}
                />
              </div>
            </Grid>

            <Grid item xs={8} md={10} lg={10}>
              <Grid container className={classes.secondryGrid}>
                <Grid item xs={12} md={6} className="userGrid">
                  <Typography className={classes.userName} variant="h5">
                    Saif Eliyas
                  </Typography>

                  <Typography className={classes.userInfo} variant="body2">
                    Software Developer | chennai, INDIA
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6} className="iconGrid">
                  <ul className={classNames(classes.iconUl, 'iconBtnWrapper')}>
                    <li>
                      <Button className={classes.blockBtn} variant="fab">
                        <Block />
                      </Button>
                    </li>

                    <li>
                      <Button className={classes.messageBtn} variant="fab">
                        <Message />
                      </Button>
                    </li>

                    <li>
                      <Button className={classes.followBtn} variant="fab">
                        <img className={classes.followIcon} src={followIcon} alt="Profile Pic"/>
                      </Button>
                    </li>
                  </ul>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>

        <div className={classes.profileControlWrapper}>
          <Paper elevation={1} className={classes.profileWrapperPapper}>
            <Grid container spacing={16} className={classes.grid3Container}>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={7}
                className={classes.tabGrid}
              >
                <ul className={classes.profileNavUl}>
                  <li>About</li>

                  <li>Achievements</li>

                  <li className={classes.followerLi}>
                    <span>Followers</span>
                    <span className={classes.followersCount}>45</span>
                  </li>

                  <li className={classes.followerLi}>
                    <span>Following</span>
                    <span className={classes.followersCount}>74</span>
                  </li>
                </ul>
              </Grid>
            </Grid>
          </Paper>

          <Grid container className={classes.aboutGrid}>
            <Grid item xs={12} md={6}>
              <AboutUserComponent />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userprofile: makeSelectUserProfile(),
});

function mapDispatchToProps() {
  return {};
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
