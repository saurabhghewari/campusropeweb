/**
 *
 * NgoList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
/* eslint-disable*/

const styles = theme => ({
  container:{
  marginTop:theme.spacing.unit * 2,
  textAlign:'center'
  }
});

/* eslint-disable react/prefer-stateless-function */
class NgoList extends React.Component {
  
  renderNoNgoLabel(){
    return (
    <Typography variant="h4">
      No NGO found
    </Typography>)
  }

  renderNgos(){
    return(
      <div>list</div>
    )
  }
  render() {
    const { classes,ngos } = this.props;
    return (
    <div className={classes.container}>
      {ngos.length === 0 ? this.renderNoNgoLabel() : this.renderNgos }
    </div>);
  }
}

NgoList.propTypes = {
  classes: PropTypes.object.isRequired,
  ngos: PropTypes.array.isRequired,
};

export default withStyles(styles)(NgoList);
