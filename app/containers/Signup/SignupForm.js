import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';
import * as Yup from 'yup';

/* eslint react/prop-types: 0 */
/* eslint prettier/prettier: 0 */
const SignupForm = ({ classes }) => (
  <Formik
    initialValues={{
      name: '',
      email: '',
      gender: '',
      password: '',
      passwordConfirm: '',
    }}
    validationSchema={Yup.object().shape({
      name: Yup.string().required,
      email: Yup.string()
        .email('please provide a valid email')
        .required('Please provide email'),
      gender: Yup.string().oneOf[('male', 'female')],
      password: Yup.string().required('please provide passoword'),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password'), null])
        .required('Password confirm is required'),
    })}
    onSubmit={(values, actions) => console.log(values, actions)}
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
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              name="email"
              autoComplete="email"
              value={values.email}
              onChange={handleChange}
              autoFocus
            />{' '}
            {touched.email &&
              errors.email && (
              <FormHelperText className={classes.error}>
                {errors.email}
              </FormHelperText>
            )}
          </FormControl>
          <Button
            fullWidth
            type="submit"
            variant="raised"
            color="primary"
            className={classes.submit}
            disabled={isSubmitting}
          >
            {' '}
            Login
          </Button>
        </form>
      );
    }}
  </Formik>
);

export default SignupForm;
