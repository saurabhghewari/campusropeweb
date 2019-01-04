/**
 *
 * TrendingNewsView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Content from 'components/Content/Loadable';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { replace } from 'react-router-redux';
import IdealImage from 'react-ideal-image';
import YouTube from 'react-youtube';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import _isEmpty from 'lodash/isEmpty';
import _includes from 'lodash/includes';

import { fetchTrendingNewsById } from './actions';
import { makeSelectStatesForOptions } from '../../store/constants/selectors';
import { makeSelectSelectedTrendingNews } from './selectors';

const styles = theme => ({
  name: {
    textAlign: 'center',
    padding: theme.spacing.unit * 2,
  },
  description: {
    textAlign: 'center',
    padding: theme.spacing.unit * 2,
    wordBreak: 'break-all',
  },
  graphy: {
    textAlign: 'center',
    wordBreak: 'break-all',
  },
});

/* eslint-disable*/
const opts = {
  height: '390',
  width: '100%',
  playerVars: {
    autoplay: 1,
  },
};
/* eslint-disable react/prefer-stateless-function */
export class TrendingNewsView extends React.Component {
  width = 100;
  _onReady(event) {
    // access to player in all event handlers via event.target
  }

  componentDidMount() {
    const trendingNewsId = this.props.match.params.trendingNewsId;
    this.props.fetchTrendingNewsById(trendingNewsId);
  }

  onBack() {
    const isAdminTrendingView = _includes(this.props.match.url, 'admin');
    if (isAdminTrendingView) {
      this.props.dispatch(replace('/news/trends/admin/'));
      return;
    }
    this.props.dispatch(replace('/news/trends'));
  }

  render() {
    const { classes, trendingNewsDetails, states } = this.props;
    return (
      <Content>
       { trendingNewsDetails.photo_urls && <div >
          {!_isEmpty(trendingNewsDetails.cover_photo) && (
            <IdealImage
              placeholder={{ color: 'grey' }}
              srcSet={[
                {
                  src: trendingNewsDetails.cover_photo,
                  width: 100,
                  height: 100,
                },
              ]}
              alt="cover Photo"
              height={100}
              width={100}
            />
          )}
            <div className={classes.name}>
            <Typography variant="h4" className={classes.graphy}>
              {trendingNewsDetails.headline}
            </Typography>
            </div>
            <div className={classes.description}>
            <Typography component="p" className={classes.graphy}>
              {trendingNewsDetails.content}
            </Typography>
            </div>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant="subtitle1">
              state : {trendingNewsDetails.state}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {
              trendingNewsDetails.photo_urls.map(pic => (
                <IdealImage
                  key={pic}
                  placeholder={{ color: 'grey' }}
                  srcSet={[{ src: pic, width: this.width, height: 200 }]}
                  alt="Photos"
                  height={200}
                  width={this.width}
                />
              ))}
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
              onClick={() => this.onBack()}
            >
              {' '}
              back
            </Button>
          </Grid>
        </div>}
      </Content>
    );
  }
}

TrendingNewsView.propTypes = {
  classes: PropTypes.object.isRequired,
  trendingNewsDetails: PropTypes.object.isRequired,
  states: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  trendingNewsDetails: makeSelectSelectedTrendingNews(),
  states: makeSelectStatesForOptions(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchTrendingNewsById: trendingNewsId =>
      dispatch(fetchTrendingNewsById(trendingNewsId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const componentWithStyles = withStyles(styles)(TrendingNewsView);

export default compose(withConnect)(componentWithStyles);
