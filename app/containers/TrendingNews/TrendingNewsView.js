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
import IdealImage from 'react-ideal-image';
import YouTube from 'react-youtube';

import { Input, Grid, Select, MenuItem, FormControl } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import _isEmpty from 'lodash/isEmpty';
import _includes from 'lodash/includes';

import reducer from './reducer';
import saga from './saga';
import { fetchTrendingNewsById } from './actions';

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
const opts = {
  height: '390',
  width: '100%',
  playerVars: {
    autoplay: 1
  }
};
/* eslint-disable react/prefer-stateless-function */
export class TrendingNewsView extends React.Component {
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  componentDidMount() {
    const trendingNewsId = this.props.match.params.trendingNewsId;
    this.props.fetchTrendingNewsById(trendingNewsId);
  }

  cancelTrendingNewsView() {
    const isAdminTrendingView = _includes(this.props.match.url, 'admin');
    if(isAdminTrendingView){
      this.props.dispatch(replace('/app/news/trends/admin/trends'));
      return
    }
    this.props.dispatch(replace('/app/news/trends'));
  }

  render() {
    const { classes, trendingNewsDetails, states } = this.props;
    return (
      <Content>
        <Grid container spacing={16}>
          {!_isEmpty(trendingNewsDetails.cover_photo) && (
            <IdealImage
            placeholder={{ color: 'grey' }}
            srcSet={[{ src: trendingNewsDetails.cover_photo, width: 100, height: 100 }]}
            alt="cover Photo"
            height={100}
            width={100}
            />
          )}
          <Grid item xs={12} sm={12} lg={6}>
                    <FormControl margin="normal" fullWidth>
                      <InputLabel htmlFor="headline">Headline</InputLabel>
                      <Input
                        id="headline"
                        name="headline"
                        multiline
                        rows="4"
                        autoComplete="headline"
                        value={trendingNewsDetails.headline}
                        readOnly={true}
                        autoFocus
                      />{' '}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} lg={6}>
                    <FormControl margin="normal" fullWidth>
                      <InputLabel htmlFor="content">Content</InputLabel>
                      <Input
                        id="content"
                        name="content"
                        multiline
                        rows="4"
                        autoComplete="content"
                        value={trendingNewsDetails.content}
                        readOnly={true}
                        autoFocus
                      />{' '}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                  <FormControl margin="normal" fullWidth>
                  <InputLabel htmlFor="state">State</InputLabel>
                  <Select
                    value={trendingNewsDetails.state}
                    readOnly
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
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                  {trendingNewsDetails.photo_urls &&
                    trendingNewsDetails.photo_urls.length && (
                    <IdealImage
                    placeholder={{ color: 'grey' }}
                    srcSet={[{ src: trendingNewsDetails.photo_urls[0], width: 10, height: 100 }]}
                    alt="Photos"
                    className={classes.photoPic}
                    height={100}
                    width={10}
                  />
                  )}
                  </Grid>
                  <Grid item xs={12} sm={12} lg={12} md={12}>
                    <FormControl margin="normal" fullWidth>
                      <InputLabel htmlFor="youtube_link">
                        Embed YouTube Link
                      </InputLabel>
                      <Input
                        id="youtube_link"
                        name="youtube_link"
                        autoComplete="youtube_link"
                        value={trendingNewsDetails.youtube_link}
                        autoFocus
                      />{' '}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                  {!_isEmpty(trendingNewsDetails.youtube_link) && (
                    <YouTube
                    videoId={trendingNewsDetails.youtube_link}
                    opts={opts}
                    onReady={this._onReady}
                  />
                  )}
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={()=>this.cancelTrendingNewsView()}
                >
                  {' '}
                  Cancel
                </Button>
                  </Grid>
        </Grid>
      </Content>
    );
  }
}

TrendingNewsView.propTypes = {
  classes: PropTypes.object.isRequired,
  trendingNewsDetails: PropTypes.object.isRequired,
  states: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    trendingNewsDetails: state.trendingNewsView.selectedTrendingNews,
    states: state.trendingNewsView.states,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchTrendingNewsById: (trendingNewsId) => dispatch(fetchTrendingNewsById(trendingNewsId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'trendingNewsView', reducer });
const withSaga = injectSaga({ key: 'trendingNewsView', saga });
const componentWithStyles = withStyles(styles)(TrendingNewsView);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(componentWithStyles);
