/**
 *
 * Login
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import withStyles from '@material-ui/core/styles/withStyles';

import bgImage from 'images/loginbg.jpg';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectLogin from './selectors';
import reducer from './reducer';
import saga from './saga';
import LoginForm from './loginForm';

const styles = theme => ({
  container: {
    backgroundColor: theme.palette.primary.main,
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    background: `url(${bgImage})`,
    backgroundPosition: 'center' /* Center the image */,
    backgroundRepeat: 'no-repeat' /* Do not repeat the image */,
    backgroundSize: 'cover',
  },
});

/* eslint-disable react/prefer-stateless-function */
export class Login extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Helmet>
          <title>Login</title>
          <meta name="description" content="Description of Login" />
        </Helmet>
        <div className={classes.container}>
          <LoginForm />
        </div>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({ login: makeSelectLogin() });

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'login', saga });
const componentWithStyles = withStyles(styles)(Login);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(componentWithStyles);
