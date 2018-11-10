/**
 *
 * Ngo
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Content from 'components/Content/Loadable';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import { Input, Grid, Select, MenuItem, FormControl } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';

import { fetchTrendingNews } from './actions';
import RenderTrendingNewsList from './RenderTrendingNewsList';

import reducer from './reducer';
import saga from './saga';

const styles = theme => ({
  noTrendingNewsLabel: {
    textAlign: 'center',
    marginTop: theme.spacing.unit * 4,
  },
});

/* eslint-disable*/

/* eslint-disable react/prefer-stateless-function */
export class TrendingNewsList extends React.Component {
  state={
    state:''
  }
  componentDidMount() {
    this.props.fetchTrendingNews();
  }

  handleChange(value){
    this.setState({
      state: value
    })
  }
  renderNoTrendingNewsLabel() {
    const { classes } = this.props;
    return <Typography variant="h4" className={classes.noTrendingNewsLabel}>
                No Trending News Created
            </Typography>;
  }

  render() {
    const { trendingNews, states } = this.props;
    const { state } = this.state;
    return (
      <Content>
        <Grid container spacing={16}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
          <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="state">State</InputLabel>
          <Select
            value={state}
            onChange={(e)=>this.handleChange(e.target.value)}
            input={<Input id="state" name="state" />}
          >
            {states.map(state => (
              <MenuItem key={state.label} value={state.value}>
                {state.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
          </Grid>
        </Grid>
        {trendingNews.length === 0 ? this.renderNoTrendingNewsLabel() :
          <RenderTrendingNewsList
            trendingNews={trendingNews}
          />
        }
      </Content>
    );
  }
}

TrendingNewsList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  trendingNews: PropTypes.array.isRequired,
  states: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    trendingNews: state.trendingNewsList.trendingNewsList,
    states: state.trendingNewsList.states,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchTrendingNews: () => dispatch(fetchTrendingNews()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'trendingNewsList', reducer });
const withSaga = injectSaga({ key: 'trendingNewsList', saga });
const componentWithStyles = withStyles(styles)(TrendingNewsList);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(componentWithStyles);
