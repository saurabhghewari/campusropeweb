/**
 *
 * MobileView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import UserBio from './components/UserBio';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
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
export class MobileView extends React.PureComponent {
  render() {
    const { classes, isLoggedUser, userinfo } = this.props;
    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={6} sm={6} lg={6} md={6}>
            <Avatar
              alt="Remy Sharp"
              src={userinfo.picture}
              className={classes.avatar}
            />
          </Grid>

          <Grid item xs={6} sm={6} lg={6} md={6}>
            <Typography>{userinfo.name}</Typography>
            <Followers />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={12} lg={12} md={12}>
            {isLoggedUser ? <MoreDialogSelf /> : <MoreDialogOther />}
            <UserBio />
            <AboutAchievementTabs />
          </Grid>
        </Grid>
      </div>
    );
  }
}

MobileView.propTypes = {
  classes: PropTypes.object.isRequired,
};

const componentWithStyles = withStyles(styles)(MobileView);

export default componentWithStyles;
