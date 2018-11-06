import React from 'react';
import PropTypes from 'prop-types';
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
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Formik } from 'formik';
import withStyles from '@material-ui/core/styles/withStyles';
import ProfileTabType from './ProfileTabTypeModel';
import * as Yup from 'yup';
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
    color: "white"
  },
  button: {
    marginBottom: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    color: '#1976d2',
    float: 'right',
    fontSize: 12,
  },
  panelDetails: {
    flexDirection: "column"
  },
  aboutUserBtnWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "10px"
  }
});

const initalValue = {
  name: '',
  gender: '',
  email: '',
  homeTown: '',
  currentCity: '',
  politicalView: '',
  workAndExperience: '',
  skill: '',
  college: '',
  otherDegreeAndCourses: '',
  careerObjectives: '',
};

const getInitialValues = (userProfile) =>
  Object.assign({}, initalValue, { ...userProfile, ...userProfile.createdBy });

/* eslint react/prop-types: 0 */
/* eslint prettier/prettier: 0 */
const AboutUserComponent = props => {
  const { classes, handleSignUp, userProfile = {}, handleCancel } = props;
  const TAB_TYPE_MAP = ProfileTabType.typeTypeMap;
  return (
    <Formik
      initialValues={getInitialValues(userProfile)}
      validationSchema={Yup.object().shape({})}
      onSubmit={(values, actions) => handleSignUp(values, actions)}
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
                    autoFocus
                  />
                </FormControl>

                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="name">Religious View</InputLabel>
                  <Input
                    id="religiousView"
                    name="religiousView"
                    value={values.religiousView}
                    onChange={handleChange}
                    autoFocus
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
                  <InputLabel htmlFor="name">Work And Experience</InputLabel>
                  <Input
                    id="name"
                    name="workAndExperience"
                    value={values.workAndExperience}
                    onChange={handleChange}
                    autoFocus
                  />
                </FormControl>

                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="name">Skill</InputLabel>
                  <Input
                    id="skill"
                    name="skill"
                    value={values.skill}
                    onChange={handleChange}
                    autoFocus
                  />
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
                  <InputLabel htmlFor="name">Other Degree And Courses</InputLabel>
                  <Input
                    id="otherDegreeAndCourses"
                    name="otherDegreeAndCourses"
                    value={values.otherDegreeAndCourses}
                    onChange={handleChange}
                    autoFocus
                  />
                </FormControl>

                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="name">Career Objectives</InputLabel>
                  <Input
                    id="careerObjectives"
                    name="careerObjectives"
                    value={values.careerObjectives}
                    onChange={handleChange}
                    autoFocus
                  />
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
  );
};

AboutUserComponent.propTypes = {
  classes: PropTypes.object,
  handleSubmit: PropTypes.func,
};

export default withStyles(styles)(AboutUserComponent);
