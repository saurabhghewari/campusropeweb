import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as Yup from 'yup';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Add from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Formik, FieldArray } from 'formik';
import withStyles from '@material-ui/core/styles/withStyles';
import { createStructuredSelector } from 'reselect';
import Upload from 'components/Upload/Loadable';
import ProfileTabType from './ProfileTabTypeModel';
import { makeSelectLoggedUser } from '../../../store/loggeduser/selectors';
import MultipleChipInput from '../../../components/MultipleChipInput';

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
    background: '#ffc400',
    marginLeft: '10px',
    color: 'white',

    '&:hover': {
      background: '#ecb809',
    },
  },
  button: {
    marginBottom: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    color: '#1976d2',
    float: 'right',
    fontSize: 12,
  },
  panelDetails: {
    flexDirection: 'column',
  },
  aboutUserBtnWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '10px',
  },
  multiInputBtn: {
    padding: '5px',
    minWidth: '30px',
    height: '40px',
    width: '40px',
    marginLeft: 10,
  },
  multiInputWrapper: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  multiInput: {
    flex: 1,
  },
  deleteBtn: {
    background: '#e63d3d',
    color: 'white',

    '&:hover': {
      background: '#d43a3a',
    },
  },
});

/* eslint react/prop-types: 0 */
class AboutUserComponent extends React.Component {
  state = {
    expanded: null,
  };

  handlePanelChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const {
      classes,
      values = {},
      handleCancel,
      handleChange,
      arrayHelpers,
      handleProfileSave,
      isOwner,
    } = this.props;
    const { expanded } = this.state;
    return (
      <ExpansionPanel
        expanded={expanded === 'panel3'}
        onChange={this.handlePanelChange('panel3')}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="body1" className={classes.heading}>
            General Information
          </Typography>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails className={classes.panelDetails}>
          <FormControl
            margin="normal"
            required="required"
            fullWidth="fullWidth"
          >
            <MultipleChipInput
              label="Work And Experience"
              defaultValue={values.workAndExperience}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl
            margin="normal"
            required="required"
            fullWidth="fullWidth"
          >
            <MultipleChipInput
              label="Skills"
              defaultValue={values.skills}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl
            margin="normal"
            required="required"
            fullWidth="fullWidth"
          >
            <InputLabel htmlFor="name">College</InputLabel>

            <Input
              id="college"
              name="college"
              value={values.college}
              onChange={handleChange}
              autoFocus="autoFocus"
            />
          </FormControl>

          <FormControl
            margin="normal"
            required="required"
            fullWidth="fullWidth"
          >
            <FieldArray
              name="otherDegreeAndCourses"
              render={arrayHelpers => (
                <MultipleChipInput
                  id="otherDegreeAndCourses"
                  type="string"
                  name="otherDegreeAndCourses"
                  label="Other Degree and Courses"
                  defaultValue={values.otherDegreeAndCourses}
                  onUpdateInput={handleChange}
                  onAdd={chipValue => {
                    arrayHelpers.push('');
                    return true;
                  }}
                />
              )}
            />
          </FormControl>

          <FormControl
            margin="normal"
            required="required"
            fullWidth="fullWidth"
          >
            <MultipleChipInput
              label="Career Objectives"
              defaultValue={values.careerObjectives}
              onChange={handleChange}
            />
          </FormControl>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

AboutUserComponent.propTypes = {
  classes: PropTypes.object,
  isOwner: PropTypes.bool.isRequired,
};

const componentWithStyles = withStyles(styles)(AboutUserComponent);

export default componentWithStyles;
