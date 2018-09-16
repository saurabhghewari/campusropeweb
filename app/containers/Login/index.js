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
import { push } from 'react-router-redux';

import withStyles from '@material-ui/core/styles/withStyles';

import bgImage from 'images/loginbg.jpg';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectLogin from './selectors';
import reducer from './reducer';
import saga from './saga';
import { onLoginFormSubmit } from './actions';
import LoginForm from './LoginForm';
import ForgotPasswordModel from './ForgotPasswordModel';

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
  state = {
    openModal: false,
  };

  handleClickOpen = () => {
    this.setState({ openModal: true });
  };

  handleClose = () => {
    this.setState({ openModal: false });
  };

  render() {
    const { classes, routeToSignup, onForgotPasswordSubmit } = this.props;
    return (
      <React.Fragment>
        <Helmet>
          <title>Login</title>
          <meta name="description" content="Description of Login" />
        </Helmet>
        <div className={classes.container}>
          <LoginForm
            handleSubmit={this.props.onLoginFormSubmit}
            handleClickOpen={this.handleClickOpen}
            handleClose={this.handleClose}
            routeToSignup={routeToSignup}
          />
          <ForgotPasswordModel
            handleClickOpen={this.handleClickOpen}
            handleClose={this.handleClose}
            openModal={this.state.openModal}
            handleSubmitEmail={onForgotPasswordSubmit}
          />
        </div>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object,
  onLoginFormSubmit: PropTypes.func.isRequired,
  routeToSignup: PropTypes.func.isRequired,
  onForgotPasswordSubmit: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({ login: makeSelectLogin() });

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onLoginFormSubmit: (values, actions) =>
      dispatch(onLoginFormSubmit(values, actions)),
    onForgotPasswordSubmit: email => console.log(email),
    routeToSignup: () => dispatch(push('/signup')),
  };
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
