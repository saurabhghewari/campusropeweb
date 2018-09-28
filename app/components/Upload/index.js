/**
 *
 * Upload
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

/* eslint-disable react/prefer-stateless-function */
class Upload extends React.Component {
  onUploadOpen = () => {
    window.cloudinary.openUploadWidget(
      { cloud_name: 'demo', upload_preset: 'a5vxnzbp' },
      (error, result) => {
        console.log(error, result);
      },
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <Button
        variant="contained"
        color="default"
        className={classes.button}
        onClick={this.onUploadOpen}
      >
        Upload
        <CloudUploadIcon className={classes.rightIcon} />
      </Button>
    );
  }
}

Upload.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Upload);
