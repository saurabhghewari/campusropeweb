/**
 *
 * Login
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectLogin from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import LoginForm from './loginForm'

const styles = (theme) => ({
    container: {
        backgroundColor: theme.palette.primary.main,
        height: '92vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

/* eslint-disable react/prefer-stateless-function */
export class Login extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <Helmet>
                    <title>Login</title>
                    <meta name="description" content="Description of Login"/>
                </Helmet>
                <AppBar position="static" color="secondary">
                    <Toolbar>
                        <Typography variant="title" color="inherit">
                            Campusrope
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className={classes.container}>
                    <LoginForm/>
                </div>
            </React.Fragment>
        );
    }
}

Login.propTypes = {
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({login: makeSelectLogin()});

function mapDispatchToProps(dispatch) {
    return {dispatch};
}

const withConnect = connect(mapStateToProps, mapDispatchToProps,);

const withReducer = injectReducer({key: 'login', reducer});
const withSaga = injectSaga({key: 'login', saga});
const componentWithStyles = withStyles(styles)(Login);

export default compose(withReducer, withSaga, withConnect,)(
    componentWithStyles
);
