/**
 *
 * AdminTrendingNewsList
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
import Button from '@material-ui/core/Button';
import { replace } from 'react-router-redux';

import { Input, Grid, Select, MenuItem, FormControl } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';

import reducer from './reducer';
import saga from './saga';
import { fetchTrendingNews } from './actions';
import TrendingNews from './TrendingNews';

const styles = theme => ({
  card: {
    marginTop: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * 3,
  },
  media: {
    height: 0,
    paddingTop: '38%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  createBtnContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  noTrendingNewsLabel: {
    textAlign: 'center',
    marginTop: theme.spacing.unit * 4,
  },
});

/* eslint-disable*/

/* eslint-disable react/prefer-stateless-function */
export class AdminTrendingNewsList extends React.Component {
  state={
    state:''
  }
  componentDidMount() {
    this.props.fetchTrendingNews();
  }
  createNewTrendingNews() {
    this.props.dispatch(replace('/app/news/trends/admin/trend/new'));
  }

  routeToTrendingNewsView(selectedTrendingNews) {
    this.props.dispatch(replace(`/app/news/trends/admin/${selectedTrendingNews.id}/details`));
  }

  handleChange(value){
    this.setState({
      state: value
    })
  }
  renderNoTrendingNewsLabel(classes) {
    return <Typography variant="h4" className={classes.noTrendingNewsLabel}>
                  No Trending News Created
            </Typography>;
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  render() {
    const { classes, trendingNews, states } = this.props;
    const { state } = this.state;
    return (
      <Content>
        <Grid container spacing={16}>
        <Grid item xs={12} sm={12} md={12} lg={12}  className={classes.createBtnContainer}>
          <Button
          variant="contained"
          color="secondary"
          onClick={() => this.createNewTrendingNews()}
        >
          {' '}
          Create{' '}
        </Button>
        </Grid>
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
        {trendingNews.length === 0 ? this.renderNoTrendingNewsLabel(classes) :
          <TrendingNews
          trendingNews={trendingNews}
          onTrendingNewsClick={selectedTrendingNews => this.routeToTrendingNewsView(selectedTrendingNews)}
          />
        }
      </Content>
    );
  }
}

AdminTrendingNewsList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  trendingNews: PropTypes.array.isRequired,
  states: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    trendingNews: state.trendingNews.trendingNewsList,
    states: state.trendingNews.states,
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

const withReducer = injectReducer({ key: 'adminTrendingNewsList', reducer });
const withSaga = injectSaga({ key: 'adminTrendingNewsList', saga });
const componentWithStyles = withStyles(styles)(AdminTrendingNewsList);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(componentWithStyles);
