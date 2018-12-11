import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { replace } from 'react-router-redux';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import TrendingUp from '@material-ui/icons/TrendingUp';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MessageIcon from '@material-ui/icons/Message';
import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = {
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    justifyContent: 'space-around',
  },
  navButtons: {
    minWidth: 'inherit',
    maxWidth: 'inherit',
    padding: 0,
    flex: 'inherit'
  }
};

class AppBottomNavigation extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
    switch (value) {
      case 0:
        this.props.dispatch(replace('/'));
        break;
      case 1:
        this.props.dispatch(replace('/news/trends'));
        break;
      case 4:
        this.props.dispatch(replace('/profile/'+ this.props.profileId));
        break;
      default:
        this.props.dispatch(replace('/'));
    }
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} className={classes.navButtons}/>
        <BottomNavigationAction label="Trends" icon={<TrendingUp />} className={classes.navButtons}/>
        <BottomNavigationAction label="Messages" icon={<MessageIcon />} className={classes.navButtons}/>
        <BottomNavigationAction
          label="Notifications"
          icon={<NotificationsIcon />}
          className={classes.navButtons}
        />
        <BottomNavigationAction label="Profile" icon={<AccountCircle />} className={classes.navButtons}/>
      </BottomNavigation>
    );
  }
}

AppBottomNavigation.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const componentWithStyles = withStyles(styles)(AppBottomNavigation);
export default compose(withConnect)(componentWithStyles);
