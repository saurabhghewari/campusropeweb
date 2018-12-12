/**
 *
 * BrowserView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import UserBio from './components/UserBio';
import Typography from '@material-ui/core/Typography';
import AboutAchievementTabs from './components/AboutAchievementTabs';
import Followers from './components/Followers';
import MoreDialogOther from './components/MoreDialogOther';
import MoreDialogSelf from './components/MoreDialogSelf';
import NewPost from './components/NewPost';
import UserPosts from './components/UserPosts';

const styles = () => ({
  avatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
});

/* eslint-disable  */
export class BrowserView extends React.PureComponent {
  render() {
    const { classes, isLoggedUser, userinfo } = this.props;
    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item lg={4} md={4}>
            <Avatar
              alt="Remy Sharp"
              src={userinfo.picture}
              className={classes.avatar}
            />
            <UserBio />
            <AboutAchievementTabs />
          </Grid>
          <Grid item lg={8} md={8}>
            <Typography>{userinfo.name}</Typography>
            <Followers />
            {isLoggedUser ? <MoreDialogSelf /> : <MoreDialogOther />}
            <NewPost />
            <UserPosts />
          </Grid>
        </Grid>
      </div>
    );
  }
}

BrowserView.propTypes = {
  classes: PropTypes.object.isRequired,
};

const componentWithStyles = withStyles(styles)(BrowserView);

export default componentWithStyles;
