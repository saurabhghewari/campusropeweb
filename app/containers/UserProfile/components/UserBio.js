/**
 *
 * UserBio
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({});

/* eslint-disable  */
export class UserBio extends React.PureComponent {
  render() {
    const { classes } = this.props;
    return <div className={classes.root} >I am full stack develope</div>;
  }
}

UserBio.propTypes = {
  classes: PropTypes.object.isRequired,
};

const componentWithStyles = withStyles(styles)(UserBio);

export default componentWithStyles;
