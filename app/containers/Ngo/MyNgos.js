/**
 *
 * MyNgos
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import NgoList from './NgoList';
/* eslint-disable*/

const styles = theme => ({});

class MyNgos extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div>My ngos working</div>
        <NgoList />
      </React.Fragment>
    );
  }
}

MyNgos.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyNgos);
