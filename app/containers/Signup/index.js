/**
 *
 * Signup
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import withStyles from '@material-ui/core/styles/withStyles';

import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSignup from './selectors';
import reducer from './reducer';
import saga from './saga';

const styles = theme => ({
  container: {
    backgroundColor: theme.palette.primary.main,
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    backgroundPosition: 'center' /* Center the image */,
    backgroundRepeat: 'no-repeat' /* Do not repeat the image */,
    backgroundSize: 'cover',
  },
  paper: {
    margin: '0px auto',
    textAlign: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
    width: `calc(100% - 24px)`,
    maxWidth: 350,
    minHeight: 400,
  },
  error: {
    color: 'red',
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  lockIconWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
});
/* eslint-disable react/prefer-stateless-function */
export class Signup extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Helmet>
          <title>Signup</title>
          <meta name="description" content="Description of Signup" />
        </Helmet>
        <div className={classes.container}>
          <Paper className={classes.paper}>
            <div className={classes.lockIconWrapper}>
              <Avatar className={classes.avatar}>
                <LockIcon />
              </Avatar>
            </div>
            <Typography variant="headline">Sign UP</Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.register}
            >
              {' '}
              Sign up
            </Button>
          </Paper>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  signup: makeSelectSignup(),
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

const withReducer = injectReducer({ key: 'signup', reducer });
const withSaga = injectSaga({ key: 'signup', saga });
const componentWithStyles = withStyles(styles)(Signup);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(componentWithStyles);
