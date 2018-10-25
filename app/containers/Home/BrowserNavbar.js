/**
 *
 * BrowserNavbar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Title from '@material-ui/icons/Title';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MessageIcon from '@material-ui/icons/Message';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';

const styles = theme => ({
  sectionDesktop: {
    display: 'flex',
    justifyContent: 'center',
    width: '210px',
    maxWidth: '220px',
  },

  sectionDesktopRight: {
    display: 'flex',
    justifyContent: 'space-around',
    maxWidth: '320px',
  },
  iconLabel: {
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: '1rem',
  },
  root: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  iconList: {
    width: 'auto',
    '&:hover': {
      borderRadius: '0',
    },
    '& span:first-child': {
      padding: 10,
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '55%',
    left: -15,
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
  seperator: {
    marginRight: 20,
  },
  link: {
    color: 'white',
  },
});

function BrowserNavbar(props) {
  const { classes, toggleDrawer } = props;

  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense" className={classes.root}>
          <Typography variant="h6" color="inherit">
            Campusrope
          </Typography>

          <div className={classes.sectionDesktop}>
            <div className={classes.seperator}>
              <Link to="/app" className={classes.link} href="#">
                <IconButton color="inherit" className={classes.iconList}>
                  <HomeIcon />
                </IconButton>
              </Link>
            </div>

            <div className={classes.seperator}>
              <IconButton color="inherit" className={classes.iconList}>
                <Title />
              </IconButton>
            </div>
          </div>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <Input
              placeholder="Search…"
              disableUnderline
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
          <div className={classes.sectionDesktopRight}>
            <div className={classes.seperator}>
              <Link to="/app/profile" className={classes.link} href="#">
                <IconButton color="inherit" className={classes.iconList}>
                  <AccountCircle />
                </IconButton>
              </Link>
            </div>

            <div className={classes.seperator}>
              <IconButton color="inherit" className={classes.iconList}>
                <MessageIcon />
              </IconButton>
            </div>

            <div className={classes.seperator}>
              <IconButton color="inherit" className={classes.iconList}>
                <NotificationsIcon />
              </IconButton>
            </div>
          </div>
          <IconButton
            className={classes.hamburgerIcon}
            onClick={() => toggleDrawer()}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

BrowserNavbar.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleDrawer: PropTypes.func,
};

export default withStyles(styles)(BrowserNavbar);
