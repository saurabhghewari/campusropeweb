/**
 *
 * AdminTask
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import classNames from 'classnames';

import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import { Checkbox, Grid } from '@material-ui/core';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectAdminTask, makeSelectSelectedAdminTask } from './selectors';
import reducer from './reducer';
import saga from './saga';
import TaskSummary from './TaskSummary';
import UserSearch from '../../components/UserSearch';
import {
  fetchAdminTasksOfGivenUser,
  toggleAdminTaskSelection,
  saveAdminTasks,
} from './actions';

const styles = theme => ({
  rootContainer: {},
  paperRoot: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  root: {
    margin: theme.spacing.unit * 4,
  },
  taskListRoot: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  taskListItems: {
    border: '1px solid #f6e9de',
    padding: 10,
    minWidth: 220,
    maxWidth: 220,
    marginBottom: theme.spacing.unit * 2,
    '&:hover': {
      border: '1px solid #4478ac',
    },
  },
  selectedItems: {
    background: '#013571',
    '& aside': {
      color: '#fff',
    },
    '& span': {
      color: '#fff',
    },
  },
  textColor: {
    color: 'orange',
  },
});

/* eslint-disable react/prefer-stateless-function */
export class AdminTask extends React.PureComponent {
  handleCheckboxChange = taskId => {
    this.props.toggleAdminTaskSelection(taskId);
  };

  renderAdminTasks() {
    const { classes, adminTasks } = this.props;
    const renderedTasks = adminTasks.map(task => {
      const taskItemClassName = classNames({
        [classes.taskListItems]: true,
        [classes.selectedItems]: task.selected,
      });
      const taskItemTextClassName = classNames({
        [classes.textColor]: task.selected,
      });
      return (
        <div className={taskItemClassName} key={task.id}>
          <Typography
            variant="body2"
            gutterBottom
            className={taskItemTextClassName}
          >
            {task.taskName}
            <Checkbox
              onChange={() => this.handleCheckboxChange(task.id)}
              checked={task.selected}
              color="primary"
            />
          </Typography>
        </div>
      );
    });

    return renderedTasks;
  }
  render() {
    const {
      classes,
      selectedAdminTasks,
      onSelectUser,
      saveAdminTasksDispatch,
    } = this.props;
    return (
      <div className={classes.rootContainer}>
        <div className={classes.root}>
          <Paper className={classes.paperRoot} elevation={1}>
            <Typography variant="h6" gutterBottom>
              Assign Task
            </Typography>

            <UserSearch onSelectUser={onSelectUser} />

            <Grid container>
              <Grid item xs={12} sm={7} md={9}>
                <div className={classes.taskListRoot}>
                  {this.renderAdminTasks()}
                </div>
              </Grid>

              <Grid item xs={12} sm={5} md={3}>
                <TaskSummary
                  handleRemoveTask={this.handleCheckboxChange}
                  tasks={selectedAdminTasks}
                  saveAdminTasks={saveAdminTasksDispatch}
                />
              </Grid>
            </Grid>
          </Paper>
        </div>
      </div>
    );
  }
}

AdminTask.propTypes = {
  classes: PropTypes.object.isRequired,
  adminTasks: PropTypes.array.isRequired,
  selectedAdminTasks: PropTypes.array.isRequired,
  toggleAdminTaskSelection: PropTypes.func.isRequired,
  onSelectUser: PropTypes.func.isRequired,
  saveAdminTasksDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  adminTasks: makeSelectAdminTask(),
  selectedAdminTasks: makeSelectSelectedAdminTask(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onSelectUser: userId => dispatch(fetchAdminTasksOfGivenUser(userId)),
    toggleAdminTaskSelection: taskId =>
      dispatch(toggleAdminTaskSelection(taskId)),
    saveAdminTasksDispatch: () => dispatch(saveAdminTasks()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'adminTask', reducer });
const withSaga = injectSaga({ key: 'adminTask', saga });
const componentWithStyles = withStyles(styles)(AdminTask);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(componentWithStyles);
