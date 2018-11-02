/**
 *
 * NewNgo
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
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
import Upload from 'components/Upload/Loadable';
import {
  makeSelectStates,
  makeSelectNgoTypes,
} from '../../store/constants/selectors';

/* eslint-disable*/

const styles = theme => ({
  form:{

  },
  submit:{
    marginTop:theme.spacing.unit * 2
  },
  cancel:{
      marginLeft:theme.spacing.unit * 2,
      marginTop:theme.spacing.unit * 2
  },
  error:{

  }
});


/* eslint-disable react/prefer-stateless-function */

const NewNgoFormComponent = ({ classes, onSubmit, onCancel ,states,ngo_types}) => (
  <Formik
    initialValues={{
      name: '',
      ngoType: '',
      ngoSiteLink: '',
      contactEmail:'',
      documentLink:'',
      operatingState:'',
      noteToUser:''
    }}
    validationSchema={Yup.object().shape({
      name: Yup.string()
        .required('Please provide name of NGO'),
        ngoType: Yup.string().required('please provide NGO type'),
        ngoSiteLink: Yup.string(),
        contactEmail: Yup.string().email('please provide a valid email').required('Please provide email'),
        documentLink:Yup.string().required('please upload  document'),
        operatingState:Yup.string().required('Please provide state of operation'),
        noteToUser:Yup.string(),
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

          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="ngoType">NGO type</InputLabel>
            <Select
              value={values.ngoType}
              onChange={handleChange}
              input={<Input id="ngoType" name="ngoType" />}
            >
              {ngo_types.map((ngo_type)=> <MenuItem key={ngo_type} value={ngo_type}>{ngo_type}</MenuItem>)}
            </Select>
            {touched.ngoType &&
              errors.ngoType && (
              <FormHelperText className={classes.error}>
                {errors.ngoType}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="name">Website Link</InputLabel>
            <Input
              id="ngoSiteLink"
              name="ngoSiteLink"
              value={values.ngoSiteLink}
              onChange={handleChange}
              
            />{' '}
            {touched.ngoSiteLink &&
              errors.ngoSiteLink && (
                <FormHelperText className={classes.error}>
                  {errors.ngoSiteLink}
                </FormHelperText>
              )}
          </FormControl>

           <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Contact Email</InputLabel>
            <Input
              id="email"
              name="email"
              autoComplete="email"
              value={values.email}
              onChange={handleChange}
            />{' '}
            {touched.email &&
              errors.email && (
                <FormHelperText className={classes.error}>
                  {errors.email}
                </FormHelperText>
              )}
          </FormControl>


           <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="contactEmail">Contact Email</InputLabel>
            <Input
              id="contactEmail"
              name="contactEmail"
              autoComplete="contactEmail"
              value={values.contactEmail}
              onChange={handleChange}
              
            />{' '}
            {touched.contactEmail &&
              errors.contactEmail && (
                <FormHelperText className={classes.error}>
                  {errors.email}
                </FormHelperText>
              )}
          </FormControl>
          
          <Upload/>


           <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="ngoType">Operating State</InputLabel>
            <Select
              value={values.operatingState}
              onChange={handleChange}
              input={<Input id="operatingState" name="operatingState" />}
            >
              {states.map((state)=> <MenuItem key={state} value={state}>{state}</MenuItem>)}
            </Select>
            {touched.operatingState &&
              errors.operatingState && (
              <FormHelperText className={classes.error}>
                {errors.operatingState}
              </FormHelperText>
            )}
          </FormControl>

           <TextField
          id="noteToUser"
          label="Note to user"
          multiline
          rowsMax="4"
          value={values.noteToUser}
          onChange={handleChange}
          margin="normal"
          fullWidth
          helperText="Upload a cancelled check of your NGO named to campusope.com with NIL amount, dated for today to get your NGO verified"
          variant="outlined"
        />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isSubmitting}
          >
            {' '}
            submit
          </Button>

          <Button
            type="submit"
            variant="contained"
            color="secondary"
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

class NewNgo extends React.Component {
  render() {
    const { classes,ngo_types,states } = this.props;
    return (
      <div>
        <NewNgoFormComponent classes={classes} states={states} ngo_types={ngo_types} />
      </div>
      
    );
  }
}

NewNgo.propTypes = {
  classes: PropTypes.object.isRequired,
};



const mapStateToProps = createStructuredSelector({
  states:makeSelectStates(),
  ngo_types:makeSelectNgoTypes()
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


export default compose(
  withStyles(styles),
  withConnect,
)(NewNgo);

