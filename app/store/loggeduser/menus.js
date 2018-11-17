import React from 'react';
import AccountBalance from '@material-ui/icons/AccountBalanceRounded';
import Gavel from '@material-ui/icons/Gavel';
import SettingsPhone from '@material-ui/icons/SettingsPhone';
import InfoOutline from '@material-ui/icons/InfoOutlined';
import Title from '@material-ui/icons/Title';
import { replace } from 'react-router-redux';
import { logOut } from '../../containers/Login/actions';

export const userDrawerMenus = [
  {
    id: 1,
    iconName: 'home',
    menuLabel: 'Home',
  },
  {
    id: 2,
    iconName: 'message',
    menuLabel: 'Messages',
  },
  {
    id: 3,
    iconName: 'assignment',
    menuLabel: 'My Admin Tasks',
    trigger: dispatch => dispatch(replace('/app/my/admintasks')),
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
    iconName: 'settings',
    menuLabel: 'Settings',
  },
  {
    id: 7,
    iconName: 'feedback',
    menuLabel: 'Suggestions and Feedback',
  },
  {
    id: 8,
    iconName: 'help',
    menuLabel: 'Help',
  },
  {
    id: 9,
    iconName: 'person',
    menuLabel: 'Log Out',
    trigger: dispatch => dispatch(logOut()),
  },
];

export const adminDrawerMenus = [
  {
    id: 1,
    iconName: 'home',
    menuLabel: 'Home',
  },
  {
    id: 2,
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
    iconName: 'settings',
    menuLabel: 'Settings',
  },
  {
    id: 7,
    iconName: 'feedback',
    menuLabel: 'Suggestions and Feedback',
  },
  {
    id: 8,
    iconName: 'help',
    menuLabel: 'Help',
  },
  {
    id: 9,
    iconName: 'person',
    menuLabel: 'Log Out',
    trigger: dispatch => dispatch(logOut()),
  },
];

export const userHomeMenus = [
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
];

export const adminHomeMenus = [
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
    title: 'Assign Admin tasks',
    iconBgColor: '#006064',
    icon: <InfoOutline />,
    linkTo: '/app/admintaskassignment',
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
