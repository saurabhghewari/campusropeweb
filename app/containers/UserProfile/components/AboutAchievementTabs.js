/**
 *
 * AboutAchievementTabs
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Button from '@material-ui/core/Button';

const styles = () => ({
  root: {
    margin: 50,
    display: 'flex',
    justifyContent: 'space-between',
  },
  achievementBtn: {
    background: '#ff4c00',
    color: 'white',
    '&:hover': {
      background: '#ea5d21db',
    },
  },
});

/* eslint-disable  */
export class AboutAchievementTabs extends React.PureComponent {

  handleAboutClick = (userinfo) => {
    this.props.dispatch(push(`/profile/${userinfo._id}/about`));
  }

  render() {
    const { classes,userinfo } = this.props;
    return (
      <div className={classes.root}>
        <Button variant="contained" color="primary"
          onClick={()=> this.handleAboutClick(userinfo)}>
          About
        </Button>
        <Button variant="contained" color="primary" className={classes.achievementBtn}>
          Achievement
        </Button>
      </div>
    );
  }
}

AboutAchievementTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const componentWithStyles = withStyles(styles)(AboutAchievementTabs);

export default withConnect(componentWithStyles);
