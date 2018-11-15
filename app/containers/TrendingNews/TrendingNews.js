/**
 *
 * TrendingNews
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import YouTube from 'react-youtube';
import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ThumbUpSharp from '@material-ui/icons/ThumbUpSharp';
import Comment from '@material-ui/icons/Comment';
import Share from '@material-ui/icons/Share';

import _isEmpty from 'lodash/isEmpty';

const styles = theme => ({
  card: {
    marginTop: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * 3,
    cursor: 'pointer',
  },
  media: {
    height: 0,
    paddingTop: '38%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
});

/* eslint-disable*/

/* eslint-disable react/prefer-stateless-function */
const opts = {
  height: '390',
  width: '100%',
  playerVars: {
    autoplay: 1
  }
};

const TrendingNewsBox = ({ trendingNewsData, classes, onTrendingNewsClick, getCreatedOnDate, _onReady }) => {
  return (
    <Card className={classes.card}
      onClick={()=> onTrendingNewsClick(trendingNewsData)}
    >
          <CardHeader
            avatar={
              <Avatar
                alt={trendingNewsData.headline}
                src={trendingNewsData.photo_urls[0]}
                className={classNames(classes.avatar, classes.bigAvatar)}
              />
            }
            title={trendingNewsData.headline}
            subheader={getCreatedOnDate(trendingNewsData.createdAt)}
          />
          <CardContent>
            <Typography component="p">{trendingNewsData.content}</Typography>
          </CardContent>
          {!_isEmpty(trendingNewsData.cover_photo) && (
            <CardMedia
            className={classes.media}
            image={trendingNewsData.cover_photo}
          />
          )}
          {!_isEmpty(trendingNewsData.youtube_link) && (
            <YouTube videoId={trendingNewsData.youtube_link}
                      opts={opts}
                      onReady={_onReady}
            />
          )}
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton aria-label="Like">
              <ThumbUpSharp />
            </IconButton>
            <IconButton aria-label="Comment">
            <Comment />
          </IconButton>
          <IconButton aria-label="Share">
          <Share />
        </IconButton>
          </CardActions>
      </Card>
  );
};

export class TrendingNews extends React.Component {

  
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  getCreatedOnDate(date) {
    const myDate = new Date(date);
    const trendingNewsCreationDate = myDate.getDate()+"/"+(myDate.getMonth()+1)+"/"+myDate.getFullYear();
    return trendingNewsCreationDate;
  }

  render() {
    const { classes, trendingNews, onTrendingNewsClick } = this.props;
    return (
      <Fragment>
      {trendingNews.map(trendingNew => (
        <TrendingNewsBox
        key={trendingNew.id}
        classes={classes}
        onTrendingNewsClick={onTrendingNewsClick}
        trendingNewsData={trendingNew}
        getCreatedOnDate={this.getCreatedOnDate}
        _onReady={this._onReady}
        />
      ))}
      </Fragment>
    );
  }
}

TrendingNews.propTypes = {
  classes: PropTypes.object.isRequired,
  trendingNews: PropTypes.array.isRequired,
  onTrendingNewsClick: PropTypes.func,
};


const componentWithStyles = withStyles(styles)(TrendingNews);

export default componentWithStyles;
