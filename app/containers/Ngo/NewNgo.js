/**
 *
 * NewNgo
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
/* eslint-disable*/

const styles = theme => ({});

/* eslint-disable react/prefer-stateless-function */
class NewNgo extends React.Component {
  render() {
    const { classes } = this.props;
    return <div>new ngo working</div>;
  }
}

NewNgo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewNgo);
