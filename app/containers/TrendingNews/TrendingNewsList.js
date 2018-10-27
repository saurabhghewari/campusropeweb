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
import { Grid } from '@material-ui/core';

import Search from 'components/Search/Loadable';

import reducer from './reducer';
import saga from './saga';

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
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
});

/* eslint-disable*/

/* eslint-disable react/prefer-stateless-function */

const renderTrendingNews = (trendingNews,classes) => {
  return trendingNews.map(trendingNew =>(
    <Card className={classes.card} key={trendingNew.id}>
 <CardHeader
   avatar={
     <Avatar
     alt={trendingNew.userName}
     src={trendingNew.profilePictureUrl}
     className={classNames(classes.avatar, classes.bigAvatar)}
   />
   }
   title={trendingNew.userName}
   subheader={trendingNew.createdOn}
 />
 <CardContent>
 <Typography component="p">
       {trendingNew.headLine}
 </Typography>
</CardContent>
 <CardMedia
   className={classes.media}
   image={trendingNew.pictureUrl}
   title={trendingNew.userName}
 />
 <CardActions className={classes.actions} disableActionSpacing>
   <IconButton aria-label="Like">
     <ThumbUpSharp />
   </IconButton>
 </CardActions>
</Card>
 ))
};
export class TrendingNewsList extends React.Component {
  render() {
    const { classes,trendingNews,states } = this.props;
    return (
      <Content>
      <Grid container spacing={16}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
      <Search options={states} value="" placeholder="State" />
    </Grid>
      </Grid>
          {renderTrendingNews(trendingNews,classes)}
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
    trendingNews : state.trendingNewsList.trendingNews,
    states : state.trendingNewsList.states,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
