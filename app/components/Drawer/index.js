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
    iconName: 'home',
    menuLabel: 'Home',
  },
  {
    id: 2,
    iconName: 'assessment',
    menuLabel: 'My NGOs',
  },
  {
    id: 3,
    iconName: 'message',
    menuLabel: 'Messages',
  },
  {
    id: 4,
    iconName: 'insert_invitation',
    menuLabel: 'Invite Friends',
  },
  {
    id: 5,
    iconName: 'perm_identity',
    menuLabel: 'Friend Suggestions',
  },
  {
    id: 6,
    iconName: 'rss_feed',
    menuLabel: 'Feeds',
  },
  {
    id: 7,
    iconName: 'settings',
    menuLabel: 'Settings',
  },
  {
    id: 8,
    iconName: 'feedback',
    menuLabel: 'Suggestions and Feedback',
  },
  {
    id: 9,
    iconName: 'help',
    menuLabel: 'Help',
  },
  {
    id: 10,
    iconName: 'person',
    menuLabel: 'Log Out',
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
