/**
 *
 * AllNgos
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';
import { replace } from 'react-router-redux';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';
import NgoList from './NgoList';
import { fetchNgos } from './actions';
import { makeSelectFetchedNgos } from './selectors';

/* eslint-disable*/

const styles = theme => ({
  createNgoBtn:{
    float:'right'
  }
});

class AllNgos extends React.Component {

  componentDidMount(){
    this.props.fetchNgos()
  }
 
  createNewNgo(){
    this.props.dispatch(replace('/app/ngos/new'))
  }

  render() {
    const { classes ,fetchedNgos} = this.props;
    return (
      <Fragment>
        <Button variant="contained" className={classes.createNgoBtn} color="secondary" onClick={() => this.createNewNgo()}> Create NGO </Button>
        <NgoList ngos={fetchedNgos}/>
      </Fragment>
    );
  }
}

AllNgos.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch:PropTypes.func.isRequired
};


const mapStateToProps = createStructuredSelector({
  fetchedNgos:makeSelectFetchedNgos()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchNgos:() => dispatch(fetchNgos())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);


export default compose(
  withStyles(styles),
  withConnect,
)(AllNgos);
