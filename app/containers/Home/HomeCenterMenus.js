/**
 *
 * HomeCenterMenus
 *
 */

import React from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import AccountBalance from '@material-ui/icons/AccountBalanceRounded';
import Assignment from '@material-ui/icons/Assessment';
import ChangeHistory from '@material-ui/icons/ChangeHistory';
import Gavel from '@material-ui/icons/Gavel';
import SettingsPhone from '@material-ui/icons/SettingsPhone';
import InfoOutline from '@material-ui/icons/InfoOutlined';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
  root: {
    margin: 'auto',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    width: '70%',
    height: '75%',
  },
  menuListItem: {
    border: '1px solid #3f51b5',
    height: 82,
    borderRadius: 5,
    display: 'flex',
    width: 250,
    cursor: 'pointer',
    margin: 20,
    '& svg': {
      fontSize: 40,
    },
  },
  menuItemContent: {
    display: 'flex',
    alignItems: 'center',
    padding: 10,
  },
  menuTitleSize: {
    fontSize: 25,
  },
});

const menus = [
  {
    title: 'NGOs',
    iconBgColor: '#FF6D00',
    icon: <AccountBalance />,
    linkTo: '/home/ngo/list',
  },
  {
    title: 'Petitions',
    iconBgColor: '#FF5722',
    icon: <Assignment />,
    linkTo: '/home/petitions/list',
  },
  {
    title: 'RTI',
    iconBgColor: '#607D8B',
    icon: <ChangeHistory />,
    linkTo: '/home/rti/list',
  },
  {
    title: 'Helpline',
    iconBgColor: '#D81B60',
    icon: <SettingsPhone />,
    linkTo: '/home/helpline',
  },
  {
    title: 'Legal Support',
    iconBgColor: '#3F51B5',
    icon: <Gavel />,
    linkTo: '/home/petitions/list',
  },
  {
    title: 'About Us',
    iconBgColor: '#006064',
    icon: <InfoOutline />,
    linkTo: '/home/profile',
  },
];

/* eslint-disable react/prefer-stateless-function */
export class HomeCenterMenus extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {menus.map(menu => (
          <div className={classes.menuListItem} key={menu.title}>
            <div className={classes.menuItemContent}>
              <Typography type="subheading" color="secondary">
                {menu.icon}
              </Typography>
            </div>
            <Typography
              variant="display1"
              className={classNames(
                classes.menuItemContent,
                classes.menuTitleSize,
              )}
            >
              {menu.title}
            </Typography>
          </div>
        ))}
      </div>
    );
  }
}

HomeCenterMenus.propTypes = {
  classes: PropTypes.object.isRequired,
};

const componentWithStyles = withStyles(styles)(HomeCenterMenus);

export default componentWithStyles;
