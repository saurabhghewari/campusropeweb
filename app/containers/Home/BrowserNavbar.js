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

const styles = {
  grow: {
    flexGrow: 1,
  },
  hamburgerIcon: {},
};

function BrowserNavbar(props) {
  const { classes } = props;
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="title" className={classes.grow} color="inherit">
            Campusrope
          </Typography>
          <IconButton
            className={classes.hamburgerIcon}
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
};

export default withStyles(styles)(BrowserNavbar);
