import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
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

const FormComponent = ({
  handleClose,
  classes,
  handleSubmitEmail,
  openModal,
}) => (
  <div>
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('please provide a valid email')
          .required('Please provide email'),
      })}
      onSubmit={(values, actions) => handleSubmitEmail(values, actions)}
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
          <Dialog
            open={openModal}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <form
              className={classes.form}
              noValidate="noValidate"
              onSubmit={handleSubmit}
            >
              <DialogTitle id="form-dialog-title">Forgot Password</DialogTitle>

              <DialogContent>
                <DialogContentText>
                  To change your password, please enter your email address here.
                  We will send forgot password link to your email.
                </DialogContentText>

                <FormControl
                  margin="normal"
                  required
                  fullWidth
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
              </DialogContent>

              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="raised"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        );
      }}
    </Formik>
  </div>
);
const ForgotPasswordModal = ({
  handleClose,
  classes,
  handleSubmitEmail,
  openModal,
}) => (
  <FormComponent
    classes={classes}
    handleClose={handleClose}
    handleSubmitEmail={handleSubmitEmail}
    openModal={openModal}
  />
);

ForgotPasswordModal.propTypes = {
  handleClose: PropTypes.func,
  handleSubmitEmail: PropTypes.func,
  classes: PropTypes.object,
  openModal: PropTypes.bool,
};

export default withStyles(styles)(ForgotPasswordModal);
