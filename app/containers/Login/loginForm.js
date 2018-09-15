import * as React from 'react';
import PropTypes from 'prop-types';

/* import Button from '@material-ui/core/Button';
import {Formik, Field, Form} from 'formik';
import TextField from '@material-ui/core/TextField'; */

import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';

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
  button: {
    margin: theme.spacing.unit,
    color: '#1976d2',
    float: 'right',
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
    marginBottom: theme.spacing.unit,
    color: 'white',
  },
});

/* const FormComponent = () => (
    <Formik
        initialValues={{
            email: '',
            password: ''
        }}
        validate={values => {
            const errors = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            return errors;
        }}
        render={({submitForm, isSubmitting}) => (<Form>
            <Field type="email" label="Email" name="email" component={TextField}/>
            <Field type="password" label="Password" name="password" component={TextField}/>
            <Button
                variant="raised"
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}>
                > Submit
            </Button>
        </Form>
        )}/>
); */

const FormPaper = ({ classes }) => (
  <Paper className={classes.paper}>
    <div className={classes.lockIconWrapper}>
      <Avatar className={classes.avatar}>
        <LockIcon />
      </Avatar>
    </div>
    <Typography variant="headline">Sign in</Typography>
    <form className={classes.form}>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input id="email" name="email" autoComplete="email" autoFocus />
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          name="password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
      </FormControl>
      <Button color="primary" className={classes.button}>
        Forgot your password?
      </Button>
      <Button
        type="submit"
        fullWidth
        variant="raised"
        color="primary"
        className={classes.submit}
      >
        Login
      </Button>
      <Button
        type="submit"
        fullWidth
        variant="raised"
        color="secondary"
        className={classes.google}
      >
        Login With Google
      </Button>
      <Typography variant="body2" gutterBottom>
        {`Don't you have an account?`}
      </Typography>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.register}
      >
        Register for free!
      </Button>
    </form>
  </Paper>
);

FormPaper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(FormPaper);
