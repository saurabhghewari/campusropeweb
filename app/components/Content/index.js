/**
 *
 * Content
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    padding: theme.spacing.unit * 2,
    minHeight: '100vh',
    margin: theme.spacing.unit,
  },
});

/* eslint-disable react/prefer-stateless-function */
class Content extends React.PureComponent {
  render() {
    const { classes, children } = this.props;
    return (
      <Grid container>
        <Grid item lg={2} />
        <Grid item xs={12} lg={8}>
          <Paper className={classes.root} elevation={10}>
            <div id="content">{children}</div>
          </Paper>
        </Grid>
        <Grid item lg={2} />
      </Grid>
    );
  }
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(Content);
