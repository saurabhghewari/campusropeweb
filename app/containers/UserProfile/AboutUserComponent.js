import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as Yup from 'yup';
import {
  Input,
  Select,
  MenuItem,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Button,
  FormHelperText,
  FormControl,
  InputLabel,
  Typography,
  TextField
} from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Formik, FieldArray } from 'formik';
import withStyles from '@material-ui/core/styles/withStyles';
import ProfileTabType from './ProfileTabTypeModel';
import { makeSelectLoggedUser } from '../../store/loggeduser/selectors'
import { createStructuredSelector } from 'reselect';
import '../App/common.css';

const styles = theme => ({
  aboutPaper: {
    padding: '10px 15px',
  },
  error: {
    color: 'red',
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {},
  cancel: {
    background: "#ffc400",
    marginLeft: "10px",
    color: "white",

    '&:hover': {
      background: "#ecb809"
    }
  },
  button: {
    marginBottom: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    color: '#1976d2',
    float: 'right',
    fontSize: 12,
  },
  panelDetails: {
    flexDirection: "column",
  },
  aboutUserBtnWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "10px",
  },
  multiInputBtn: {
    padding: "5px",
    minWidth: "30px",
    height: "40px",
    width: "40px",
    marginLeft: 10
  },
  multiInputWrapper: {
    display: "flex",
    alignItems: "center",
    position: "relative"
  },
  multiInput: {
    flex: 1
  },
  deleteBtn: {
    background: "#e63d3d",
    color: "white",

    '&:hover': {
      background: "#d43a3a"
    }
  },
});

const initalValue = {
  name: '',
  gender: '',
  email: '',
  homeTown: '',
  country: '',
  currentCity: '',
  politicalView: '',
  workAndExperience: [''],
  skill: [''],
  college: '',
  otherDegreeAndCourses: [''],
  careerObjectives: [''],
};

const getInitialValues = (userProfile) =>
  Object.assign({}, initalValue, { ...userProfile, ...userProfile.createdBy });

let MultiInputComponent = ({ arrayHelpers, values, classes, label, handleChange, name }) => {

  return (
    <div>
      {values.map((value, index) => (
        <div key={index} className={classes.multiInputWrapper}>
          <TextField
            id={index}
            name={`${name}.${index}`}
            label={label}
            className={classes.multiInput}
            value={value}
            onChange={handleChange}
          />

          <Button variant="contained" color="primary" className={classes.multiInputBtn}
            onClick={() => arrayHelpers.insert(index, "")}>
            <Add />
          </Button>

          {(values.length > 1) && <Button variant="contained" onClick={() => arrayHelpers.remove(index)}
            className={classNames(classes.multiInputBtn, classes.deleteBtn)}>
            <Delete />
          </Button>}
        </div>
      ))
      }</div>
  )
}

/* eslint react/prop-types: 0 */
/* eslint prettier/prettier: 0 */
const AboutUserComponent = (props) => {

  const { classes, userProfile = {}, handleCancel, handleProfileSave } = props;

  const TAB_TYPE_MAP = ProfileTabType.typeTypeMap;

  return (
    <Formik
      initialValues={getInitialValues(userProfile)}
      validationSchema={Yup.object().shape({})}
      onSubmit={(values, actions) => handleProfileSave(values, actions)}
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
            <Typography variant="h5" className="text-center"> About</Typography>

            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="body1" className={classes.heading}>Basic Information</Typography>
              </ExpansionPanelSummary>

              <ExpansionPanelDetails className={classes.panelDetails}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="name">Name</InputLabel>
                  <Input
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={values.name}
                    onChange={handleChange}
                    autoFocus
                    fullWidth="true"
                  />
                </FormControl>

                <FormControl margin="normal" fullWidth>
                  <InputLabel htmlFor="gender">Gender</InputLabel>
                  <Select
                    value={values.gender}
                    onChange={handleChange}
                    input={<Input id="gender" name="gender" />}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">other</MenuItem>
                  </Select>
                  {touched.gender &&
                    errors.gender && (
                      <FormHelperText className={classes.error}>
                        {errors.gender}
                      </FormHelperText>
                    )}
                </FormControl>

                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Email</InputLabel>
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
                  {errors.exists && (
                    <FormHelperText className={classes.error}>
                      {errors.exists}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="name">Country</InputLabel>
                  <Input
                    id="country"
                    name="country"
                    value={values.country}
                    onChange={handleChange}
                    autoFocus
                  />
                </FormControl>

                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="name">Home Town</InputLabel>
                  <Input
                    id="homeTown"
                    name="homeTown"
                    value={values.homeTown}
                    onChange={handleChange}
                    autoFocus
                  />
                </FormControl>

                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="name">Current City</InputLabel>
                  <Input
                    id="currentCity"
                    name="currentCity"
                    value={values.currentCity}
                    onChange={handleChange}
                    autoFocus
                  />
                </FormControl>

              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="body1" className={classes.heading}>Stereotypes</Typography>
              </ExpansionPanelSummary>

              <ExpansionPanelDetails className={classes.panelDetails}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="name">Political View</InputLabel>
                  <Input
                    id="politicalView"
                    name="politicalView"
                    value={values.politicalView}
                    onChange={handleChange}
                    autoFocus multiline
                  />
                </FormControl>

                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="name">Religious View</InputLabel>
                  <Input
                    id="religiousView"
                    name="religiousView"
                    value={values.religiousView}
                    onChange={handleChange}
                    autoFocus multiline
                  />
                </FormControl>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="body1" className={classes.heading}>General Information</Typography>
              </ExpansionPanelSummary>

              <ExpansionPanelDetails className={classes.panelDetails}>
                <FormControl margin="normal" required fullWidth>
                  <FieldArray name="workAndExperience"
                    render={(arrayHelpers) =>
                      <MultiInputComponent arrayHelpers={arrayHelpers}
                        label="Work And Experience" values={values.workAndExperience}
                        handleChange={handleChange} classes={classes} name="workAndExperience" />} />
                </FormControl>

                <FormControl margin="normal" required fullWidth>
                  <FieldArray name="skill"
                    render={(arrayHelpers) =>
                      <MultiInputComponent arrayHelpers={arrayHelpers}
                        label="skill" values={values.skill} handleChange={handleChange}
                        classes={classes} name="skill" />} />
                </FormControl>

                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="name">College</InputLabel>
                  <Input
                    id="college"
                    name="college"
                    value={values.college}
                    onChange={handleChange}
                    autoFocus
                  />
                </FormControl>

                <FormControl margin="normal" required fullWidth>
                  <FieldArray name="otherDegreeAndCourses"
                    render={(arrayHelpers) =>
                      <MultiInputComponent arrayHelpers={arrayHelpers}
                        label="Other Degree and Courses" values={values.otherDegreeAndCourses}
                        handleChange={handleChange} classes={classes}
                        name="otherDegreeAndCourses" />} />
                </FormControl>

                <FormControl margin="normal" required fullWidth>
                  <FieldArray name="careerObjectives"
                    render={(arrayHelpers) =>
                      <MultiInputComponent arrayHelpers={arrayHelpers}
                        label="Career Objectives" values={values.careerObjectives}
                        handleChange={handleChange} classes={classes}
                        name="careerObjectives" />} />
                </FormControl>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <div className={classes.aboutUserBtnWrapper}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={isSubmitting}
              >
                {' '}
                Save
              </Button>

              <Button
                onClick={() => handleCancel(TAB_TYPE_MAP.POST_TAB)}
                variant="contained"
                className={classes.cancel}
                disabled={isSubmitting}
              >
                {' '}
                cancel
              </Button>
            </div>

          </form>
        );
      }}
    </Formik>
  )
}

AboutUserComponent.propTypes = {
  classes: PropTypes.object,
  handleSubmit: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

const mapStateToProps = createStructuredSelector({
  loggedUserInfo: makeSelectLoggedUser()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const componentWithStyles = withStyles(styles)(AboutUserComponent);

export default compose(
  withConnect,
)(componentWithStyles);
