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
import Content from 'components/Content/Loadable';
import { push } from 'react-router-redux';

import { Formik } from 'formik';
import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import * as Yup from 'yup';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Upload from 'components/Upload/Loadable';
import _isEmpty from 'lodash/isEmpty';
import {newsClientService} from '../../feathers'


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
  card: {
    margin: theme.spacing.unit * 4,
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
});

/* eslint-disable */

export class NewTrendingNewsClient extends React.PureComponent {


  onSubmit(values, actions) {
    newsClientService.create(values).then(() => {
        this.props.dispatch(push('/news/trends/admin/trends'));
    })
  }

  onCancel() {
    this.props.dispatch(push('/news/trends/admin/trends'));
  }

  render() {
    return (
      <Content>
        <Formik
          initialValues={{
            name: '',
            logourl: ''
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('please provide name of news Client'),
            logourl: Yup.string().required('Please provide logo'),
          })}
          onSubmit={(values, actions) => this.onSubmit(values, actions)}
        >
          {props => {
            const {
              values,
              touched,
              errors,
              handleChange,
              setFieldValue,
              isSubmitting,
              handleSubmit,
            } = props;
            const { classes, states } = this.props;
            return (
              <form
                className={classes.form}
                noValidate="noValidate"
                onSubmit={handleSubmit}
              >
                <Grid container spacing={16}>
                  <Grid item xs={12} sm={12} lg={12}>
                    <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="headline">Name</InputLabel>
                      <Input
                        id="name"
                        name="name"
                        multiline
                        autoComplete="name"
                        value={values.name}
                        onChange={handleChange}
                        autoFocus
                      />{' '}
                      {touched.name &&
                        errors.name && (
                          <FormHelperText className={classes.error}>
                            {errors.name}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Upload
                      className={classes.uploadBtn}
                      text="Upload logo"
                      onUploaded={res =>
                        setFieldValue('logourl', res[0].secure_url)
                      }
                    />
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      {!_isEmpty(values.logourl) && (
                        <Card className={classes.card}>
                          <CardMedia
                            component="img"
                            alt="trending news image"
                            className={classes.media}
                            src={values.logourl}
                            title="Contemplative Reptile"
                          />
                        </Card>
                      )}
                    </Grid>
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
                      onClick={() => this.onCancel()}
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

NewTrendingNewsClient.propTypes = {
  classes: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
 
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    submitNewTrendingNewsDetails: (values, actions) =>
      dispatch(submitNewTrendingNews(values, actions)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const componentWithStyles = withStyles(styles)(NewTrendingNewsClient);

export default compose(withConnect)(componentWithStyles);
