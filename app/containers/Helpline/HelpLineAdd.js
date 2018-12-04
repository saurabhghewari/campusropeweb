/**
 *
 * HelplineAdd
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Content from 'components/Content/Loadable';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { replace } from 'react-router-redux';
import { makeSelectStates } from '../../store/constants/selectors';
import makeSelectLoggedUser from '../../store/loggeduser/selectors';
import { createHelpline } from './actions';


const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
const styles = theme => ({
  form: {},
  submit: {
    marginTop: theme.spacing.unit * 2,
  },
  cancel: {
    marginLeft: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
  },
  error: {
    color: 'red',
  },
});

/* eslint-disable*/
const NewHelplineFormComponent = ({
  classes,
  onSubmit,
  onCancel,
  states
}) => (
  <Formik
    initialValues={{
      name: '',
      description: '',
      operatingState: 'all',
      websiteLink: '',
      linkToFileComplaint: '',
      helplineNumber: '',
    }}
    validationSchema={Yup.object().shape({
      name: Yup.string().required('Please provide name of helpline'),
      description: Yup.string(),
      operatingState: Yup.string().required('Please specify operating state'),
      websiteLink: Yup.string().matches(urlRegex,'Please enter proper url with protocol'),
      linkToFileComplaint: Yup.string().matches(urlRegex,'Please enter proper url with protocol'),
      helplineNumber: Yup.string().required(
        'Please provide number of helpline',
      ),
    })}
    onSubmit={(values, actions) => onSubmit(values, actions)}
  >
    {props => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleSubmit
      } = props;
      return (
        <form
          className={classes.form}
          noValidate="noValidate"
          onSubmit={handleSubmit}
        >
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              id="name"
              name="name"
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

          <TextField
            id="description"
            label="Description about Helpline"
            multiline
            rowsMax="8"
            value={values.description}
            onChange={handleChange}
            margin="normal"
            fullWidth
            helperText="Describe about the helpline"
            variant="outlined"
          />

          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="websiteLink">Helpline Website Link</InputLabel>
            <Input
              id="websiteLink"
              name="websiteLink"
              value={values.websiteLink}
              onChange={handleChange}
            />{' '}
            {touched.websiteLink &&
              errors.websiteLink && (
                <FormHelperText className={classes.error}>
                  {errors.websiteLink}
                </FormHelperText>
              )}
          </FormControl>

          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="linkToFileComplaint">
              {' '}
              Website Link to register complaints
            </InputLabel>
            <Input
              id="linkToFileComplaint"
              name="linkToFileComplaint"
              value={values.linkToFileComplaint}
              onChange={handleChange}
            />{' '}
            {touched.linkToFileComplaint &&
              errors.linkToFileComplaint && (
                <FormHelperText className={classes.error}>
                  {errors.linkToFileComplaint}
                </FormHelperText>
              )}
          </FormControl>

          <FormControl margin="normal" fullWidth required>
            <InputLabel htmlFor="operatingState">Operating State</InputLabel>
            <Select
              value={values.operatingState}
              onChange={handleChange}
              input={<Input id="operatingState" name="operatingState" />}
            >
              {states.map(state => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </Select>
            {touched.operatingState &&
              errors.operatingState && (
                <FormHelperText className={classes.error}>
                  {errors.operatingState}
                </FormHelperText>
              )}
          </FormControl>

          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="helplineNumber">Helpline Number</InputLabel>
            <Input
              id="helplineNumber"
              name="helplineNumber"
              value={values.helplineNumber}
              onChange={handleChange}
              autoFocus
            />{' '}
            {touched.helplineNumber &&
              errors.helplineNumber && (
                <FormHelperText className={classes.error}>
                  {errors.helplineNumber}
                </FormHelperText>
              )}
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isSubmitting}
          >
            {' '}
            create
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => onCancel()}
            className={classes.cancel}
            disabled={isSubmitting}
          >
            {' '}
            cancel
          </Button>
        </form>
      );
    }}
  </Formik>
);

class HelplineAdd extends React.Component {
  onCancel() {
    this.props.dispatch(replace('/app/helpline/admin'));
  }
  onSubmit(values, actions) {
    this.props.submitNewHelplineDetails(
      {
        ...values,
        createdBy: this.props.loggedUser._id,
      },
      actions,
    );
  }
  render() {
    const { classes, ngo_types, states } = this.props;
    return (
      <Content>
        <NewHelplineFormComponent
          classes={classes}
          onCancel={() => this.onCancel()}
          onSubmit={(values, actions) => this.onSubmit(values, actions)}
          states={states}
        />
      </Content>
    );
  }
}

HelplineAdd.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  states: makeSelectStates(),
  loggedUser: makeSelectLoggedUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    submitNewHelplineDetails: (values, actions) =>
      dispatch(createHelpline(values, actions)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withStyles(styles),
  withConnect,
)(HelplineAdd);
