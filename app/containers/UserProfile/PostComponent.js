import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import bgImage from 'images/loginbg.jpg';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = () => ({
  postField: {
    margin: 0,
    marginLeft: '30px',
  },
  postBottomSection: {
    justifyContent: 'space-between',
    padding: '10px',
    borderTop: '1px solid lightgray',
  },
  postTopSection: {
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  postSection: {
    display: 'flex',
    padding: '10px',
  },
  postAvatar: {
    width: 70,
    height: 70,
  },
  postedTime: {
    fontSize: '14px',
  },
  postUserName: {
    flex: 1,
    padding: '15px 0 0 30px',
  },
  followsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    fontSize: '14px',
  },
  postCenterSection: {
    minHeight: '50px',
    padding: '0 15px',
  },
  followsCount: {
    color: '#3f56b5',
  },
});

const PostComponent = props => {
  const { classes } = props;

  return (
    <Paper>
      <div className={classNames(classes.postTopSection, classes.postSection)}>
        <Avatar
          alt="Adelle Charles"
          src={bgImage}
          className={classes.postAvatar}
        />

        <Typography className={classes.postUserName} variant="body1">
          Saif Eliyas
        </Typography>

        <span className={classes.postedTime}>
          3.15 PM <ArrowDropDown />
        </span>
      </div>

      <div className={classes.postCenterSection}>
        <Typography variant="body2">Happy Deepavali</Typography>
      </div>

      <div
        className={classNames(classes.postBottomSection, classes.postSection)}
      >
        <span className={classes.followsWrapper}>
          <span className={classes.followsLabel}>Likes</span>

          <span className={classes.followsCount}>4646</span>
        </span>

        <span className={classes.followsWrapper}>
          <span className={classes.followsLabel}>Coments</span>

          <span className={classes.followsCount}>974</span>
        </span>

        <span className={classes.followsWrapper}>
          <span className={classes.followsLabel}>Shares</span>

          <span className={classes.followsCount}>79</span>
        </span>
      </div>
    </Paper>
  );
};

PostComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostComponent);
