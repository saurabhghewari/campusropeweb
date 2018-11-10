/**
 *
 * Ngo
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

import _isEmpty from 'lodash/isEmpty';

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

export class RenderTrendingNewsList extends React.Component {
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
    const { classes, trendingNews } = this.props;
    return (
      <Fragment>
      {trendingNews.map(trendingNew => (
        <Card className={classes.card} key={trendingNew.id}>
          <CardHeader
            avatar={
              <Avatar
                alt={trendingNew.headline}
                src={trendingNew.photo_urls[0]}
                className={classNames(classes.avatar, classes.bigAvatar)}
              />
            }
            title={trendingNew.headline}
            subheader={this.getCreatedOnDate(trendingNew.createdAt)}
          />
          <CardContent>
            <Typography component="p">{trendingNew.content}</Typography>
          </CardContent>
          {!_isEmpty(trendingNew.cover_photo) && (
            <CardMedia
            className={classes.media}
            image={trendingNew.cover_photo}
          />
          )}
          {!_isEmpty(trendingNew.youtube_link) && (
            <YouTube videoId={trendingNew.youtube_link}
                      opts={opts}
                      onReady={this._onReady}
            />
          )}
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton aria-label="Like">
              <ThumbUpSharp />
            </IconButton>
          </CardActions>
        </Card>
      ))}
      </Fragment>
    );
  }
}

RenderTrendingNewsList.propTypes = {
  classes: PropTypes.object.isRequired,
  trendingNews: PropTypes.array.isRequired
};


const componentWithStyles = withStyles(styles)(RenderTrendingNewsList);

export default componentWithStyles;
