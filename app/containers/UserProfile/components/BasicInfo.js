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
class AboutUserComponent extends React.PureComponent {
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
      values,
      handleCancel,
      handleChange,
      touched,
      errors,
      handleProfileSave,
      isOwner,
    } = this.props;
    const { expanded } = this.state;
    const TAB_TYPE_MAP = ProfileTabType.typeTypeMap;
    return (
      <ExpansionPanel
        expanded={expanded === 'panel1'}
        onChange={this.handlePanelChange('panel1')}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="body1" className={classes.heading}>
            Basic Information
          </Typography>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails className={classes.panelDetails}>
          <FormControl
            margin="normal"
            required="required"
            fullWidth="fullWidth"
          >
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              id="name"
              name="name"
              autoComplete="name"
              value={values.name}
              onChange={handleChange}
              autoFocus="autoFocus"
              fullWidth="fullWidth"
            />
          </FormControl>

          <FormControl margin="normal" fullWidth="fullWidth">
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

          <FormControl
            margin="normal"
            required="required"
            fullWidth="fullWidth"
          >
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              name="email"
              autoComplete="email"
              value={values.email}
              disabled="disabled"
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

          <FormControl
            margin="normal"
            required="required"
            fullWidth="fullWidth"
          >
            <InputLabel htmlFor="name">Country</InputLabel>
            <Input
              id="country"
              name="country"
              value={values.country}
              onChange={handleChange}
              autoFocus="autoFocus"
            />
          </FormControl>

          <FormControl
            margin="normal"
            required="required"
            fullWidth="fullWidth"
          >
            <InputLabel htmlFor="name">Home Town</InputLabel>
            <Input
              id="homeTown"
              name="homeTown"
              value={values.homeTown}
              onChange={handleChange}
              autoFocus="autoFocus"
            />
          </FormControl>

          <FormControl
            margin="normal"
            required="required"
            fullWidth="fullWidth"
          >
            <InputLabel htmlFor="name">Current City</InputLabel>
            <Input
              id="currentCity"
              name="currentCity"
              value={values.currentCity}
              onChange={handleChange}
              autoFocus="autoFocus"
            />
          </FormControl>

          <Upload
            text="Upload Your profile picture"
            onUploaded={res => setFieldValue('picture', res[0].secure_url)}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

AboutUserComponent.propTypes = {
  classes: PropTypes.object,
  isOwner: PropTypes.bool.isRequired,
};

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

const mapStateToProps = createStructuredSelector({
  loggedUserInfo: makeSelectLoggedUser(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const componentWithStyles = withStyles(styles)(AboutUserComponent);

export default compose(withConnect)(componentWithStyles);
