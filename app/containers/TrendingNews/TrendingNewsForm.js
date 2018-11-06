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
import YouTube from 'react-youtube';

import { Formik } from 'formik';
import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Input, Grid } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import * as Yup from 'yup';
import IdealImage from 'react-ideal-image';
import Search from 'components/Search/Loadable';
import Upload from 'components/Upload/Loadable';
import _isEmpty from 'lodash/isEmpty';

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
    marginTop: theme.spacing.unit * 2,
  },
  cancel: {
    marginLeft: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
  },
  uploadBtn: {
    marginLeft: 0,
    margin: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  photoPic: {
    float: 'left',
    width: '10%',
    height: 'auto',
  },
  photoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
});

/* eslint-disable */
const opts = {
  height: '390',
  width: '100%',
  playerVars: {
    autoplay: 1
  }
};
export class TrendingNewsForm extends React.Component {
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
  render() {
    return (
      <Content>
        <Formik
          initialValues={{
            headline: '',
            content: '',
            state: '',
            photos: '',
            coverPhoto: '',
            embedYoutubeVideoUrl: '',
          }}
          validationSchema={Yup.object().shape({
            headline: Yup.string().required('please provide headline'),
            content: Yup.string().required('Please provide content'),
            photos: Yup.string().required('please upload  Photos'),
            state: Yup.string().required('Please choose any one of the State'),
          })}
        >
          {props => {
            const { values, touched, errors, handleChange,setFieldValue, isSubmitting } = props;
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
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <div style={{marginTop:10}}>
                      <Search options={states} value="" placeholder="State" />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Upload
                    className={classes.uploadBtn}
                    text="Upload Photos"
                    onUploaded={res => setFieldValue('photos', res[0].secure_url)}
                  />
                  {errors.photos && (
                    <FormHelperText className={classes.error}>
                      {errors.photos}
                    </FormHelperText>
                  )}
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                  {!_isEmpty(values.photos) && (
                    <div className={classes.photoContainer}>
                            <IdealImage
                            placeholder={{ color: 'grey' }}
                            srcSet={[{ src: values.photos, width: 10, height: 100 }]}
                            alt="Photos"
                            className={classes.photoPic}
                            height={100}
                            width={10}
                          />
                        <Button variant="fab" mini color="secondary" aria-label="Delete"
                        className={classes.button}>
                        <DeleteIcon />
                      </Button>
                    </div>
                  )}
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Upload
                    className={classes.uploadBtn}
                    text="Upload Cover Photo"
                    onUploaded={res => setFieldValue('coverPhoto', res[0].secure_url)}
                  />
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                {!_isEmpty(values.coverPhoto) && (
                  <IdealImage
                  placeholder={{ color: 'grey' }}
                  srcSet={[{ src: values.coverPhoto, width: 100, height: 50 }]}
                  alt="cover Photo"
                  height={50}
                  width={100}
                />
                )}
                </Grid>
                </Grid>
                <Grid item xs={12} sm={12} lg={12} md={12}>
                    <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="embedYoutubeVideoUrl">Embed YouTube Link</InputLabel>
                      <Input
                        id="embedYoutubeVideoUrl"
                        name="embedYoutubeVideoUrl"
                        autoComplete="embedYoutubeVideoUrl"
                        value={values.embedYoutubeVideoUrl}
                        onChange={handleChange}
                        autoFocus
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                  {!_isEmpty(values.embedYoutubeVideoUrl) && (
                    <YouTube
                    videoId={values.embedYoutubeVideoUrl}
                    opts={opts}
                    onReady={this._onReady}
                  />
                  )}
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={isSubmitting}
                >
                  {' '}
                  Submit
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.cancel}
                  disabled={isSubmitting}
                >
                  {' '}
                  Cancel
                </Button>
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
