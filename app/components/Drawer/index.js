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

const menuItemsConfig = [
  {
    id: 1,
    iconName: 'inbox',
    menuLabel: 'Inbox',
  },
  {
    id: 2,
    iconName: 'inbox',
    menuLabel: 'Inbox',
  },
  {
    id: 3,
    iconName: 'inbox',
    menuLabel: 'Inbox',
  },
  {
    id: 4,
    iconName: 'inbox',
    menuLabel: 'Inbox',
  },
  {
    id: 5,
    iconName: 'inbox',
    menuLabel: 'Inbox',
  },
  {
    id: 6,
    iconName: 'inbox',
    menuLabel: 'Inbox',
  },
  {
    id: 7,
    iconName: 'inbox',
    menuLabel: 'Inbox',
  },
  {
    id: 8,
    iconName: 'inbox',
    menuLabel: 'Inbox',
  },
];

const MenuItems = menus =>
  menus.map(menu => (
    <ListItem button key={menu.id}>
      <ListItemIcon>
        <Icon>{menu.iconName}</Icon>
      </ListItemIcon>
      <ListItemText primary={menu.menuLabel} />
    </ListItem>
  ));

const styes = {
  list: {
    width: 200,
  },
};

/* eslint-disable react/prefer-stateless-function */
class TemporaryDrawer extends React.Component {
  render() {
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
        <div style={styes.list}>
          <List>{MenuItems(menuItemsConfig)}</List>
        </div>
      </Drawer>
    );
  }
}

TemporaryDrawer.propTypes = {
  open: PropTypes.bool,
  toggleDrawer: PropTypes.func,
};

export default TemporaryDrawer;
