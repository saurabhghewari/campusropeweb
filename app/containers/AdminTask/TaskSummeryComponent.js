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

const AssignedTasks = ({ adminTasks, handleTaskRemove, classes }) =>
  adminTasks.map(
    task =>
      task.selected ? (
        <li className={classes.taskWrapper} key={task.id}>
          <span>{task.taskName}</span>
          <span>
            <Cancel
              className={classes.cancelIcon}
              onClick={() => handleTaskRemove(task.id)}
            />
          </span>
        </li>
      ) : (
        ''
      ),
  );

const TaskSummeryComponent = ({ adminTasks, handleTaskRemove, classes }) => (
  <Paper className={classes.taskPaper}>
    <Typography className={classes.summeryTitle} variant="body1">
      <i>
        <PlaylistAdd />
      </i>
      <span>Summary</span>
    </Typography>

    <ul className={classes.taskList}>
      {adminTasks.find(task => task.selected) ? (
        <AssignedTasks
          adminTasks={adminTasks}
          classes={classes}
          handleTaskRemove={handleTaskRemove}
        />
      ) : (
        <li>No Task Assigned</li>
      )}
    </ul>
  </Paper>
);

TaskSummeryComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  handleTaskRemove: PropTypes.func,
  adminTasks: PropTypes.array,
};

export default withStyles(styles)(TaskSummeryComponent);
