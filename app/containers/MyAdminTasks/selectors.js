import React from 'react';
import { createSelector } from 'reselect';
import Assignment from '@material-ui/icons/Assignment';

/**
 * Direct selector to the myAdminTasks state domain
 */

const selectMyAdminTasksDomain = state => state.myAdminTasks;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MyAdminTasks
 */

const makeSelectMyAdminTasks = () =>
  createSelector(selectMyAdminTasksDomain, substate =>
    substate.map(task => ({
      title: task.taskName,
      iconBgColor: '#FF6D00',
      icon: <Assignment />,
      linkTo: '/app/my/admintasks',
    })),
  );

export default makeSelectMyAdminTasks;
export { selectMyAdminTasksDomain };
