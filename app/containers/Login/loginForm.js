import * as React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import { GoogleLogin } from 'react-google-login';

const styles = theme => ({
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
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  lockIconWrapper: {
    display: 'flex',
    justifyContent: 'center',
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

  rememberMeWrapper: {
    marginBottom: theme.spacing.unit * 2,
  },
  register: {
    backgroundColor: '#2e7d32',
    color: 'white',
    '&:hover': {
      backgroundColor: '#3fa244',
    },
  },
  google: {
    backgroundColor: 'red',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 7,
    color: 'white',
  },
});

/* eslint react/prop-types: 0 */
/* eslint prettier/prettier: 0 */

const FormComponent = ({ classes, onSubmit, handleClickOpen }) => (
  <Formik
    initialValues={{
      email: '',
      password: '',
      remember: false,
    }}
    validationSchema={Yup.object().shape({
      email: Yup.string()
        .email('please provide a valid email')
        .required('Please provide email'),
      password: Yup.string().required('please provide passoword'),
      remember: Yup.boolean(),
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
          {errors.authentication && (
            <span className={classes.error}>{errors.authentication}</span>
          )}
          <FormControl
            margin="normal"
            required
            fullWidth="fullWidth"
          >
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

          <FormControl
            margin="normal"
            required
            fullWidth="fullWidth"
          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              autoComplete="current-password"
            />{' '}
            {touched.password &&
              errors.password && (
                <FormHelperText className={classes.error}>
                  {errors.password}
                </FormHelperText>
              )}
          </FormControl>
          <div className="rememberMeWrapper">
            <FormControlLabel
              control={
                <Checkbox
                  name="remember"
                  type="checkbox"
                  id="remember"
                  checked={values.remember}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label="Remember me"
            />
            <Button
              color="primary"
              className={classes.button}
              onClick={handleClickOpen}
            >
              Forgot password?
            </Button>
          </div>

          <Button
            fullWidth="fullWidth"
            type="submit"
            variant="contained"
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

const FormPaper = ({
  classes,
  handleSubmit,
  routeToSignup,
  handleClickOpen,
}) => (
  <Paper className={classes.paper}>
    <div className={classes.lockIconWrapper}>
      <Avatar className={classes.avatar}>
        <LockIcon />
      </Avatar>
    </div>
    <Typography variant="h5">Sign in</Typography>
    <FormComponent
      classes={classes}
      onSubmit={handleSubmit}
      handleClickOpen={handleClickOpen}
    />
    <GoogleLogin
      clientId="988043376297-la3l4of9h9njusecop8af9a0ddcn8tev.apps.googleusercontent.com"
      onSuccess={() => {}}
      onFailure={() => {}}
      uxMode="popup"
      render={({ onClick }) => (
        <Button
          type="submit"
          fullWidth="fullWidth"
          variant="contained"
          color="secondary"
          onClick={onClick}
          className={classes.google}
        >
          {' '}
          Login With Google
        </Button>
      )}
    />

    <Typography variant="body2" gutterBottom>
      New to Campusrope ?
    </Typography>
    <Button
      type="submit"
      fullWidth="fullWidth"
      variant="contained"
      color="primary"
      onClick={routeToSignup}
      className={classes.register}
    >
      {' '}
      Sign up for free!
    </Button>
  </Paper>
);

FormPaper.propTypes = {
  classes: PropTypes.object,
  routeToSignup: PropTypes.func,
  handleSubmit: PropTypes.func,
};

export default withStyles(styles)(FormPaper);
