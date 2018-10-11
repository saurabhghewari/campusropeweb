import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import { Paper, Typography } from '@material-ui/core';
import Cancel from '@material-ui/icons/Cancel';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';

const styles = () => ({
  taskList: {
    padding: 0,
    '& li': {
      listStyleType: 'none',
      padding: '10px 15px',
    },
  },
  taskPaper: {
    border: '1px solid #e8e8e8',
    minWidth: '190px',
  },
  taskWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  summeryTitle: {
    padding: '10px',
    borderBottom: '1px solid #e8e8e8',
    background: '#f4f4f4',
    fontSize: '17px',
    fontWeight: 400,
    fontFamily: 'roboto',
    '& span': {
      paddingLeft: '15px',
    },
  },
  cancelIcon: {
    color: 'blue',
    fontSize: '16px',
    cursor: 'pointer',
  },
});

const renderAssignedTasks = (tasks, classes, handleRemoveTask) => {
  if (tasks.length === 0) {
    return <li>No Task Assigned</li>;
  }
  return tasks.map(task => (
    <li className={classes.taskWrapper} key={task.id}>
      <span>{task.taskName}</span>
      <span>
        <Cancel
          className={classes.cancelIcon}
          onClick={() => handleRemoveTask(task.id)}
        />
      </span>
    </li>
  ));
};

const TaskSummeryComponent = ({ tasks, handleRemoveTask, classes }) => (
  <Paper className={classes.taskPaper}>
    <Typography className={classes.summeryTitle} variant="body1">
      <i>
        <PlaylistAdd />
      </i>
      <span>Summary</span>
    </Typography>

    <ul className={classes.taskList}>
      {renderAssignedTasks(tasks, classes, handleRemoveTask)}
    </ul>
  </Paper>
);

TaskSummeryComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  handleRemoveTask: PropTypes.func,
  tasks: PropTypes.array,
};

export default withStyles(styles)(TaskSummeryComponent);
