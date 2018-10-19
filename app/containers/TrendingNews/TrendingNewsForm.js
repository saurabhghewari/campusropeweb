/**
 *
 * TrendingNewsForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Content from 'components/Content/Loadable';

import { Formik } from 'formik';
import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Input, Grid } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import * as Yup from 'yup';
import Search from 'components/Search/Loadable';
import reducer from './reducer';
import saga from './saga';

import { getStates } from './selectors';

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
  submit: {
    marginTop: 15,
  },
});

/* eslint-disable */
export class TrendingNewsForm extends React.Component {
  render() {
    return (
      <Content>
        <Formik
          initialValues={{
            headline: '',
            content: '',
            state: '',
            embedYoutubeVideoUrl: '',
          }}
          validationSchema={Yup.object().shape({
            headline: Yup.string().required('please provide headline'),
            content: Yup.string().required('Please provide content'),
            state: Yup.string().required('Please choose any one of the State'),
          })}
        >
          {props => {
            const { values, touched, errors, handleChange } = props;
            const { classes, states } = this.props;
            return (
              <form className={classes.form} noValidate="noValidate">
                <Grid container spacing={16}>
                  <Grid item xs={12} sm={12} lg={6}>
                    <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="headline">Headline</InputLabel>
                      <Input
                        id="headline"
                        name="headline"
                        multiline
                        rows="4"
                        autoComplete="headline"
                        value={values.headline}
                        onChange={handleChange}
                        autoFocus
                      />{' '}
                      {touched.headline &&
                        errors.headline && (
                        <FormHelperText className={classes.error}>
                          {errors.headline}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} lg={6}>
                    <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="content">Content</InputLabel>
                      <Input
                        id="content"
                        name="content"
                        multiline
                        rows="4"
                        autoComplete="content"
                        value={values.content}
                        onChange={handleChange}
                        autoFocus
                      />{' '}
                      {touched.content &&
                        errors.content && (
                        <FormHelperText className={classes.error}>
                          {errors.content}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Search options={states} value="" placeholder="State" />
                  </Grid>
                </Grid>
              </form>
            );
          }}
        </Formik>
      </Content>
    );
  }
}

TrendingNewsForm.propTypes = {
  classes: PropTypes.object,
  states: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  states: getStates(),
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

const withReducer = injectReducer({ key: 'trendingNewsForm', reducer });
const withSaga = injectSaga({ key: 'trendingNewsForm', saga });
const componentWithStyles = withStyles(styles)(TrendingNewsForm);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(componentWithStyles);
