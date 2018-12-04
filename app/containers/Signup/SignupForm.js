import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import  Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem  from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';
import * as Yup from 'yup';

/* eslint react/prop-types: 0 */
/* eslint prettier/prettier: 0 */
const SignupForm = ({ classes, handleSignUp }) => (
  <Formik
    initialValues={{
      name: '',
      email: '',
      gender: '',
      password: '',
      passwordConfirm: '',
    }}
    validationSchema={Yup.object().shape({
      name: Yup.string().required('please provide name'),
      email: Yup.string()
        .email('please provide a valid email')
        .required('Please provide email'),
      password: Yup.string().required('please provide passoword'),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password')], "Passwords don't match")
        .required('Please confirm your password'),
    })}
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
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              id="name"
              name="name"
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
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              value={values.password}
              onChange={handleChange}
            />{' '}
            {touched.password &&
              errors.password && (
                <FormHelperText className={classes.error}>
                  {errors.password}
                </FormHelperText>
              )}
          </FormControl>

          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="passwordConfirm">Confirm Password</InputLabel>
            <Input
              name="passwordConfirm"
              type="password"
              id="passwordConfirm"
              value={values.passwordConfirm}
              onChange={handleChange}
            />{' '}
            {touched.passwordConfirm &&
              errors.passwordConfirm && (
                <FormHelperText className={classes.error}>
                  {errors.passwordConfirm}
                </FormHelperText>
              )}
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
            Signp
          </Button>
        </form>
      );
    }}
  </Formik>
);

export default SignupForm;
