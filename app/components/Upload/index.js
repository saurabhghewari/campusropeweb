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
      {
        cloud_name: 'campusrope',
        upload_preset: 'vbvm62go',
        apiKey: 969738646161883,
      },
      (error, result) => {
        if (error) {
          throw error;
        }
        this.props.onUploaded(result);
      },
    );
  };

  render() {
    const { classes, className, text } = this.props;
    return (
      <Button
        variant="contained"
        color="default"
        className={className}
        onClick={this.onUploadOpen}
      >
        {text || 'Upload'}
        <CloudUploadIcon className={classes.rightIcon} />
      </Button>
    );
  }
}

Upload.propTypes = {
  classes: PropTypes.object.isRequired,
  onUploaded: PropTypes.func.isRequired,
  text: PropTypes.string,
  className: PropTypes.string,
};

export default withStyles(styles)(Upload);
