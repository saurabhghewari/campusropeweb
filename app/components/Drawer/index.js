/**
 *
 * Drawer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';

const MenuItems = (menus, dispatch) =>
  menus.map(menu => (
    <ListItem button key={menu.id} onClick={() => menu.trigger(dispatch)}>
      <ListItemIcon>
        <Icon>{menu.iconName}</Icon>
      </ListItemIcon>
      <ListItemText primary={menu.menuLabel} />
    </ListItem>
  ));

const styles = theme => ({
  list: {
    width: 350,
    [theme.breakpoints.up('sm')]: {
      width: 250,
    },
  },
});

/* eslint-disable react/prefer-stateless-function */
class TemporaryDrawer extends React.Component {
  render() {
    const { dispatch, menuItems } = this.props;
    return (
      <Drawer
        anchor="right"
        open={this.props.open}
        onClose={() => this.props.toggleDrawer(false)}
        tabIndex={0}
        role="button"
        onClick={() => this.props.toggleDrawer(false)}
        onKeyDown={() => this.props.toggleDrawer(false)}
      >
        <div style={styles.list}>
          <List>{MenuItems(menuItems, dispatch)}</List>
        </div>
      </Drawer>
    );
  }
}

TemporaryDrawer.propTypes = {
  open: PropTypes.bool,
  toggleDrawer: PropTypes.func,
  dispatch: PropTypes.func,
  menuItems: PropTypes.array,
};

export default TemporaryDrawer;
