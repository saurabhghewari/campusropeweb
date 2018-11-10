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
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ThumbUpSharp from '@material-ui/icons/ThumbUpSharp';
import { replace } from 'react-router-redux';

import { Input, Grid, Select, MenuItem, FormControl } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';

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
  createBtnContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

/* eslint-disable*/

/* eslint-disable react/prefer-stateless-function */

const renderAdminTrendingNews = (trendingNews, classes) => {
  return trendingNews.map(trendingNew => (
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
        <Typography component="p">{trendingNew.headLine}</Typography>
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
  ));
};
export class AdminTrendingNewsList extends React.Component {
  state={
    state:''
  }
  createNewTrendingNews() {
    this.props.dispatch(replace('/app/news/trends/admin/trend/new'));
  }

  handleChange(value){
    this.setState({
      state: value
    })
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
        {renderAdminTrendingNews(trendingNews, classes)}
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
    trendingNews: [],
    states: state.trendingNews.states,
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

const withReducer = injectReducer({ key: 'adminTrendingNewsList', reducer });
const withSaga = injectSaga({ key: 'adminTrendingNewsList', saga });
const componentWithStyles = withStyles(styles)(AdminTrendingNewsList);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(componentWithStyles);
