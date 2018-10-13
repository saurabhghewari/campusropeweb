/**
 *
 * NgoList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
/* eslint-disable*/

const styles = theme => ({});

/* eslint-disable react/prefer-stateless-function */
class NgoList extends React.Component {
  render() {
    const { classes } = this.props;
    return <div>Ngos list working</div>;
  }
}

NgoList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NgoList);
