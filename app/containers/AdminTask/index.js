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
import makeSelectAdminTask from './selectors';
import reducer from './reducer';
import saga from './saga';
import TaskSummeryComponent from './TaskSummeryComponent';
import UserSearch from '../../components/UserSearch';

const adminTaskList = [
  {
    id: 1,
    taskName: 'Helpline',
    selected: false,
  },
  {
    id: 2,
    taskName: 'Trending News',
    selected: false,
  },
  {
    id: 3,
    taskName: 'Feed Commercials',
    selected: false,
  },
  {
    id: 4,
    taskName: 'Feed Contents',
    selected: false,
  },
  {
    id: 5,
    taskName: 'Help',
    selected: false,
  },
  {
    id: 6,
    taskName: 'Helpline',
    selected: false,
  },
  {
    id: 7,
    taskName: 'Approve NGO News',
    selected: false,
  },
  {
    id: 8,
    taskName: 'Trending News',
    selected: false,
  },
  {
    id: 9,
    taskName: 'NGO Verifications',
    selected: false,
  },
  {
    id: 10,
    taskName: 'Users/Notifications',
    selected: false,
  },
  {
    id: 11,
    taskName: 'Petitions and RTIs',
    selected: false,
  },
  {
    id: 12,
    taskName: 'Reported posts',
    selected: false,
  },
  {
    id: 13,
    taskName: 'Statistics',
    selected: false,
  },
  {
    id: 14,
    taskName: 'Suggestions/Feedback',
    selected: false,
  },
  {
    id: 15,
    taskName: 'Abuse Reports',
    selected: false,
  },
  {
    id: 16,
    taskName: 'About us',
    selected: false,
  },
];

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
});

/* eslint-disable react/prefer-stateless-function */
export class AdminTask extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      adminTasks: adminTaskList,
    };
  }

  handleCheckboxChange = index => {
    const { adminTasks } = this.state;
    this.setState({
      adminTasks: adminTasks.map((task, i) => {
        if (i + 1 === index) {
          return { ...task, selected: !task.selected };
        }
        return task;
      }),
    });
  };

  render() {
    const { classes } = this.props;
    const renderTasks = this.state.adminTasks.map(task => {
      const taskListItemSelectedClass = task.selected
        ? classes.selectedItems
        : '';
      return (
        <div
          className={classNames(
            classes.taskListItems,
            taskListItemSelectedClass,
          )}
          key={task.id}
        >
          <Typography variant="body2" gutterBottom>
            {task.taskName}
            <Checkbox
              onChange={() => {
                this.handleCheckboxChange(task.id);
              }}
              checked={task.selected}
              color="primary"
            />
          </Typography>
        </div>
      );
    });

    return (
      <div className={classes.rootContainer}>
        <div className={classes.root}>
          <Paper className={classes.paperRoot} elevation={1}>
            <Typography variant="h6" gutterBottom>
              Assign Task
            </Typography>

            <UserSearch />

            <Grid container>
              <Grid item xs={12} sm={7} md={9}>
                <div className={classes.taskListRoot}>{renderTasks}</div>
              </Grid>

              <Grid item xs={12} sm={5} md={3}>
                <TaskSummeryComponent
                  handleTaskRemove={this.handleCheckboxChange}
                  adminTasks={this.state.adminTasks}
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
};

const mapStateToProps = createStructuredSelector({
  admintask: makeSelectAdminTask(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
