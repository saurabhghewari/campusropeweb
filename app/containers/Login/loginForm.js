import * as React from 'react';
import PropTypes from 'prop-types';

/* import Button from '@material-ui/core/Button';
import {Formik, Field, Form} from 'formik';
import TextField from '@material-ui/core/TextField'; */
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  paper: {
    margin: '0px auto',
    textAlign: 'center',
    padding: 12,
    width: `calc(100% - 24px)`,
    maxWidth: 496,
    minHeight: 400,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
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

const FormPaper = ({ classes }) => <Paper className={classes.paper} />;

FormPaper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(FormPaper);
