/**
 *
 * BrowserView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles'


const styles = () => ({});

/* eslint-disable  */
export class BrowserView extends React.PureComponent {
  render() {
    const { classes} = this.props;
    return (
      <div className={classes.root}>
       
      </div>
    );
  }
}

BrowserView.propTypes = {
  classes: PropTypes.object.isRequired
};

const componentWithStyles = withStyles(styles)(BrowserView);

export default componentWithStyles;
