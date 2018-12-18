/**
 *
 * HelplineEdit
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Content from 'components/Content/Loadable';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import { makeSelectSelectedHelpline } from './selectors';
import {
  fetchHelplineById,
  updateHelplineById,
  deleteHelpline,
} from './actions';
import { makeSelectStates } from '../../store/constants/selectors';


const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;


const styles = theme => ({
  name: {
    textAlign: 'center',
    padding: theme.spacing.unit * 2,
  },
  description: {
    textAlign: 'center',
    padding: theme.spacing.unit * 2,
    wordBreak: 'break-all',
  },
  number: {
    textAlign: 'center',
    padding: theme.spacing.unit * 2,
  },
  siteLink: {
    textAlign: 'center',
    padding: theme.spacing.unit * 2,
  },
  complaintLink: {
    textAlign: 'center',
    padding: theme.spacing.unit * 2,
  },
  link: {
    marginLeft: theme.spacing.unit,
    pointerEvents: 'none',
    cursor: 'pointer',
  },
  deleteButton: {
    marginLeft: 15,
  },
  save:{
    backgroundColor:'green',
    marginRight:10
  }
});

/* eslint-disable react/prefer-stateless-function */
class HelplineEdit extends React.Component {

  componentDidMount() {
    const helplineId = this.props.match.params.helplineId;
    this.props.fetchHelplineById(helplineId);
  }



  delete() {
    this.props.deleteHelplineId(this.props.helpline._id);
  }

  cancel() {
    this.props.dispatch(push('/helpline/admin'));
  }

  onUpdate(values,actions){
    this.props.updateHelplineById({
      _id: this.props.helpline._id,
      data: values,
      actions
    });
  }

  render() {
    const { helpline, classes,states } = this.props;
    return (
      <Content>

<Formik
    initialValues={{
      name: helpline.name,
      description: helpline.description,
      operatingState: helpline.operatingState || 'All India',
      websiteLink: helpline.websiteLink,
      linkToFileComplaint: helpline.linkToFileComplaint,
      helplineNumber: helpline.helplineNumber,
    }}
    validationSchema={Yup.object().shape({
      name: Yup.string().required('Please provide name of helpline'),
      description: Yup.string(),
      operatingState: Yup.string().required('Please specify operating state'),
      websiteLink: Yup.string().matches(
        urlRegex,
        'Please enter proper url with protocol',
      ),
      linkToFileComplaint: Yup.string().matches(
        urlRegex,
        'Please enter proper url with protocol',
      ),
      helplineNumber: Yup.string().required(
        'Please provide number of helpline',
      ),
    })}
    onSubmit={(values, actions) => this.onUpdate(values, actions)}
  >
    {props => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleSubmit,
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
              {states.concat(['All India']).map(state => (
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
            className={classes.save}
          >
            {' '}
            save
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => this.cancel()}
          >
            {' '}
            Go back
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => this.delete()}
            className={classes.deleteButton}
          >
            {' '}
            Delete
          </Button>
        </form>
      );
    }}
  </Formik>
      </Content>
    );
  }
}

HelplineEdit.propTypes = {
  helpline: PropTypes.object,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  helpline: makeSelectSelectedHelpline(),
  states: makeSelectStates()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchHelplineById: helplineId => dispatch(fetchHelplineById(helplineId)),
    updateHelplineById: updatedHelpline =>
      dispatch(updateHelplineById(updatedHelpline)),
    deleteHelplineId: helplineId => dispatch(deleteHelpline(helplineId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const componentWithStyles = withStyles(styles)(HelplineEdit);

export default compose(withConnect)(componentWithStyles);
