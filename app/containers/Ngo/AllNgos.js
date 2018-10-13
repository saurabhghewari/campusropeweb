/**
 *
 * AllNgos
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import NgoList from './NgoList';

/* eslint-disable*/

const styles = theme => ({});

class AllNgos extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <div>All ngos working</div>
        <NgoList />
      </Fragment>
    );
  }
}

AllNgos.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AllNgos);
