/**
 *
 * TrendingNews
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import makeSelectTrendingNews from './selectors';
import reducer from './reducer';
import saga from './saga';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 4,
  },
  paperRoot: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  searchInput: {
    outline: 'none',
    fontFamily: 'inherit',
    fontSize: '100%',
    background:
      '#ededed url(https://static.tumblr.com/ftv85bp/MIXmud4tx/search-icon.png) no-repeat 9px center',
    border: 'solid 1px #ccc',
    padding: '9px 10px 9px 32px',
    width: 40,
    borderRadius: '10em',
    transition: 'all .5s',
    '& focus': {
      width: 130,
      backgroundColor: '#fff',
      borderColor: '#66CC75',
      boxShadow: '0 0 5px rgba(109,207,246,.5)',
    },
  },
  searchContainer: {
    '& input': {
      paddingLeft: 10,
      color: 'transparent',
      cursor: 'pointer',
    },
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

/* eslint-disable react/prefer-stateless-function */
export class TrendingNews extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paperRoot} elevation={1}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12}>
              <Button
                variant="fab"
                mini
                color="primary"
                aria-label="Add"
                className={classes.button}
              >
                <AddIcon />
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <div className={classes.searchContainer}>
                <input
                  type="search"
                  placeholder="Search"
                  className={classes.searchInput}
                />
              </div>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

TrendingNews.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  trendingnews: makeSelectTrendingNews(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'trendingNews', reducer });
const withSaga = injectSaga({ key: 'trendingNews', saga });
const componentWithStyles = withStyles(styles)(TrendingNews);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(componentWithStyles);
