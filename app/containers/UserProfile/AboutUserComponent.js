import React from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  Select,
  MenuItem,
  Paper,
  Button,
  FormHelperText,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import { Formik } from 'formik';
import withStyles from '@material-ui/core/styles/withStyles';
import * as Yup from 'yup';

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
  submit: {
    marginBottom: theme.spacing.unit,
  },
  button: {
    marginBottom: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    color: '#1976d2',
    float: 'right',
    fontSize: 12,
  },
});

/* eslint react/prop-types: 0 */
/* eslint prettier/prettier: 0 */
const AboutUserComponent = ({ classes, handleSignUp }) => (
  <Formik
    initialValues={{
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
    }}
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
        <Paper elevation={1} className={classes.aboutPaper}>
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
                autoComplete="name"
                value={values.name}
                onChange={handleChange}
                autoFocus
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
              {errors.exists && <FormHelperText className={classes.error}>{errors.exists}</FormHelperText>}
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

            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isSubmitting}
            >
              {' '}
                            Save
            </Button>
          </form>
        </Paper>
      );
    }}
  </Formik>
);

AboutUserComponent.propTypes = {
  classes: PropTypes.object,
  handleSubmit: PropTypes.func,
};

export default withStyles(styles)(AboutUserComponent);
