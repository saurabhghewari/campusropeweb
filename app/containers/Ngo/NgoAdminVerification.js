/**
 *
 * AllNgos
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';
import { replace } from 'react-router-redux';
import { connect } from 'react-redux';
import { compose } from 'redux';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { fetchNgos } from './actions';
import { makeSelectFetchedNgos } from './selectors';

/* eslint-disable*/

const styles = theme => ({
  createNgoBtn:{
    float:'right'
  }
});

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}


class NgoVerification extends React.Component {

    state = {
        value: 1,
      };
    
      handleChange = (event, value) => {
        this.setState({ value });
      };

  componentDidMount(){
    this.props.fetchNgos()
  }
 
  createNewNgo(){
    this.props.dispatch(replace('/app/ngos/new'))
  }

  render() {
    const { classes ,fetchedNgos} = this.props;
    return (
    <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="PENDING" />
            <Tab label="APPROVED" />
          </Tabs>
        </AppBar>
        {value === 1 && <TabContainer>Item Two</TabContainer>}
        {value === 2 && <TabContainer>Item Three</TabContainer>}
      </div>
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
)(NgoVerification);
