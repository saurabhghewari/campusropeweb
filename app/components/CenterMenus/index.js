/**
 *
 * CenterMenus
 *
 */

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

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
    fontSize: 18,
  },
  menuItemButton: {
    width: 240,
    '& span': {
      display: 'flex',
      justifyContent: 'space-around',
    },
  },
});

/* eslint-disable  */
export class HomeCenterMenus extends React.PureComponent {
  render() {
    const { classes, menus } = this.props;
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
  menus: PropTypes.array.isRequired,
};

const componentWithStyles = withStyles(styles)(HomeCenterMenus);

export default componentWithStyles;
