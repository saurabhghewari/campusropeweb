/**
 *
 * HomeCenterMenus
 *
 */

import React from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import AccountBalance from '@material-ui/icons/AccountBalanceRounded';
import Gavel from '@material-ui/icons/Gavel';
import SettingsPhone from '@material-ui/icons/SettingsPhone';
import InfoOutline from '@material-ui/icons/InfoOutlined';
import Title from '@material-ui/icons/Title';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = () => ({
  root: {
    margin: 'auto',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    width: '70%',
    height: '75%',
    alignItems: 'center',
  },
  menuListItem: {
    height: 82,
    borderRadius: 5,
    display: 'flex',
    cursor: 'pointer',
    margin: 20,
    '& svg': {
      fontSize: 40,
    },
  },
  link: {
    textDecoration: 'none',
  },
  menuItemContent: {
    display: 'flex',
    alignItems: 'center',
    padding: 10,
  },
  menuTitleSize: {
    fontSize: 25,
  },
  menuItemButton: {
    width: 240,
    '& span': {
      display: 'flex',
      justifyContent: 'space-around',
    },
  },
});

const menus = [
  {
    title: 'NGOs',
    iconBgColor: '#FF6D00',
    icon: <AccountBalance />,
    linkTo: '/app/ngos',
  },
  {
    title: 'Helpline',
    iconBgColor: '#D81B60',
    icon: <SettingsPhone />,
    linkTo: '/app/helpline',
  },
  {
    title: 'Support',
    iconBgColor: '#3F51B5',
    icon: <Gavel />,
    linkTo: 'app/support',
  },
  {
    title: 'About Us',
    iconBgColor: '#006064',
    icon: <InfoOutline />,
    linkTo: '/app/about',
  },
  {
    title: 'Admin tasks',
    iconBgColor: '#006064',
    icon: <InfoOutline />,
    linkTo: '/app/admintask',
  },
  {
    title: 'NGO verification',
    iconBgColor: '#006064',
    icon: <InfoOutline />,
    linkTo: '/app/ngos/verification',
  },
  {
    title: 'Admin Trends',
    iconBgColor: '#006064',
    icon: <Title />,
    linkTo: '/app/news/trends/admin/trends',
  },
];

/* eslint-disable  */
export class HomeCenterMenus extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {menus.map(menu => (
          <div className={classes.menuListItem} key={menu.title}>
            <Link to={menu.linkTo} className={classes.link}>
              <Button
                variant="outlined"
                color="secondary"
                className={classes.menuItemButton}
              >
                <div className={classes.menuItemContent}>
                  <Typography type="subheading" color="secondary">
                    {menu.icon}
                  </Typography>
                </div>
                <Typography
                  variant="h5"
                  className={classNames(
                    classes.menuItemContent,
                    classes.menuTitleSize,
                  )}
                >
                  {menu.title}
                </Typography>
              </Button>
            </Link>
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
