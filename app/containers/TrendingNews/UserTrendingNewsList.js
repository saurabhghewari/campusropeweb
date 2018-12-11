/**
 *
 * TrendingNewsList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Content from 'components/Content/Loadable';
import { withStyles } from '@material-ui/core/styles';
import { replace } from 'react-router-redux';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import { fetchTrendingNews } from './actions';
import TrendingNewsList from './TrendingNewsList';
import { makeSelectStates } from '../../store/constants/selectors';
import { makeSelectTrendingNews } from './selectors';

const styles = theme => ({
  noTrendingNewsLabel: {
    textAlign: 'center',
    marginTop: theme.spacing.unit * 4,
  },
});

/* eslint-disable*/

/* eslint-disable react/prefer-stateless-function */
export class UserTrendingNewsList extends React.Component {
  state={
    state:'All',
  }
  componentDidMount() {
    this.props.fetchTrendingNews();
  }

  routeToTrendingNewsView(selectedTrendingNews) {
    this.props.dispatch(replace(`/news/trends/${selectedTrendingNews._id}/details`));
  }

  handleChange(value){
    this.setState({
      state: value
    },() => this.props.fetchTrendingNews(value))
    
  }
  renderNoTrendingNewsLabel() {
    const { classes } = this.props;
    return <Typography variant="h4" className={classes.noTrendingNewsLabel}>
               {/*  No Trending News Created */}
            </Typography>;
  }

  render() {
    const { trendingNews, states } = this.props;
    const { state } = this.state;
    return (
      <Content withPaper={false}>
        <Grid container spacing={16}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
          <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="state">State</InputLabel>
          <Select
            value={state}
            onChange={(e)=>this.handleChange(e.target.value)}
            input={<Input id="state" name="state" />}
          >
            {states.concat(['All']).map(state => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
          </Grid>
        </Grid>
        {trendingNews.length === 0 ? this.renderNoTrendingNewsLabel() :
          <TrendingNewsList
            trendingNews={trendingNews}
            onTrendingNewsClick={selectedTrendingNews => this.routeToTrendingNewsView(selectedTrendingNews)}
          />
        }
      </Content>
    );
  }
}

UserTrendingNewsList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  trendingNews: PropTypes.array.isRequired,
  states: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector ({
  trendingNews: makeSelectTrendingNews(),
  states: makeSelectStates()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchTrendingNews: (state) => dispatch(fetchTrendingNews(state)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const componentWithStyles = withStyles(styles)(UserTrendingNewsList);

export default compose(
  withConnect,
)(componentWithStyles);
