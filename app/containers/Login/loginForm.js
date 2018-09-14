import * as React from 'react';
import Button from '@material-ui/core/Button';
import {Formik, Field, Form} from 'formik';
import {LinearProgress} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles'
import Paper from '@material-ui/core/Paper'
import LockIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';

const styles = (theme) => ({
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main
    }
})

const FormComponent = () => (
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
        onSubmit={(values, {setSubmitting}) => {
            setTimeout(() => {
                setSubmitting(false);
                alert(JSON.stringify(values, null, 2));
            }, 500);
        }}
        render={({submitForm, isSubmitting, values}) => (
            <Form>
                <Field type="email" label="Email" name="email" component={TextField}/>
                <br/>
                <Field type="password" label="Password" name="password" component={TextField}/>
                <br/> {isSubmitting && <LinearProgress/>}
                <br/>
                <Button
                    variant="raised"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={submitForm}>
                    Submit
                </Button>
            </Form>
        )}/>
);

const FormPaper = ({classes}) => {
    return (
        <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockIcon/>
            </Avatar>
            <FormComponent/>
        </Paper>
    )
}

export default withStyles(styles)(FormPaper)