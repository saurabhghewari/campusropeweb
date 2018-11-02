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
import Typography from '@material-ui/core/Typography';
import IdealImage from 'react-ideal-image';
import _isEmpty from 'lodash/isEmpty';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { replace } from 'react-router-redux';
import Upload from 'components/Upload/Loadable';
import {
  makeSelectStates,
  makeSelectNgoTypes,
} from '../../store/constants/selectors';
import makeSelectLoggedUser from '../../store/loggeduser/selectors';
import { submitNewNgo } from './actions';

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
      color:'red'
  },
  uploadBtn:{
    marginLeft:0,
    margin: theme.spacing.unit,
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
        setFieldValue
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

          <FormControl margin="normal" fullWidth required>
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

          <FormControl margin="normal"  fullWidth>
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
                  {errors.contactEmail}
                </FormHelperText>
              )}
          </FormControl>
          
          <Upload className={classes.uploadBtn} text='Upload cancelled Check pic' onUploaded={(res)=>setFieldValue('documentLink',res[0].secure_url)}/>
          <Typography variant="caption">
          Upload a cancelled check of your NGO named to campusope.com with NIL amount, dated for today to get your NGO verified
          </Typography>

          {
              errors.documentLink && (
                <FormHelperText className={classes.error}>
                  {errors.documentLink}
                </FormHelperText>
              )}

              {
                !_isEmpty(values.documentLink) && (
                  <IdealImage
                  placeholder={{color:'grey'}}
                  srcSet={[{src: values.documentLink, width: 100,height:100}]}
                  alt="cancelled check pic"
                  width={100}
                  height={100}
                />
                )
              }


           <FormControl margin="normal" fullWidth required>
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
          rowsMax="8"
          value={values.noteToUser}
          onChange={handleChange}
          margin="normal"
          fullWidth
          helperText="After Successful verification, your NGO will be listed on Campusrope"
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
            variant="contained"
            color="secondary"
            onClick={()=> onCancel()}
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
  onCancel(){
    this.props.dispatch(replace('/app/ngos'))
  }
  onSubmit(values,actions){
    this.props.submitNewNgoDetails({
      ...values,
      createdBy:this.props.loggedUser.id
    },actions)
  }
  render() {
    const { classes,ngo_types,states } = this.props;
    return (
      <div>
        <NewNgoFormComponent 
        classes={classes}
        onCancel={() => this.onCancel()} 
        onSubmit={(values,actions) => this.onSubmit(values,actions)} 
        states={states} 
        ngo_types={ngo_types} />
      </div>
      
    );
  }
}

NewNgo.propTypes = {
  classes: PropTypes.object.isRequired,
};



const mapStateToProps = createStructuredSelector({
  states:makeSelectStates(),
  ngo_types:makeSelectNgoTypes(),
  loggedUser:makeSelectLoggedUser()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    submitNewNgoDetails:(values,actions) => dispatch(submitNewNgo(values,actions))
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

