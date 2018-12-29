/**
 *
 * AdminTrendingNewsList
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Content from 'components/Content/Loadable';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import green from '@material-ui/core/colors/green';
import { push } from 'react-router-redux';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Tooltip from '@material-ui/core/Tooltip';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { fetchTrendingNews, deleteSelectedTrendingNews } from './actions';
import { makeSelectTrendingNews } from './selectors';
import { makeSelectStatesForOptions } from '../../store/constants/selectors';

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
  root: {
    position: 'relative',
  },
  addButton: {
    position: 'absolute',
    right: theme.spacing.unit * 2,
    color: theme.palette.common.white,
    backgroundColor: green[500],
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

/* eslint-disable*/
const TrendingNewsCards = props => {
  const {
    trendingNewsData,
    classes,
    getCreatedOnDate,
    openDeleteConfirmationModal,
    goToTrendingNewsEdit,
  } = props;
  return (
    <Card className={classes.card}>
      <CardHeader
        title={trendingNewsData.headline}
        subheader={getCreatedOnDate(trendingNewsData.createdAt)}
      />
      <CardContent>
        <Typography component="p">{trendingNewsData.content}</Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Tooltip title="Edit">
          <IconButton
            color="primary"
            aria-label="Edit"
            onClick={() => goToTrendingNewsEdit(trendingNewsData)}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            color="secondary"
            aria-label="Delete"
            onClick={() => openDeleteConfirmationModal(trendingNewsData)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

const RenderDeleteConfirmationModal = props => {
  const {
    isDeletedModalOpen,
    closeDeleteConfirmationModal,
    onConfirmTrendingNewsDelete,
  } = props;
  return (
    <Dialog
      open={isDeletedModalOpen}
      TransitionComponent={Transition}
      keepMounted
      disableBackdropClick={true}
      onClose={closeDeleteConfirmationModal}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        {'Delete Confirmation'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are You Sure You Want to delete it.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDeleteConfirmationModal} color="default">
          Cancel
        </Button>
        <Button onClick={onConfirmTrendingNewsDelete} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

/* eslint-disable react/prefer-stateless-function */
export class AdminTrendingNewsList extends React.Component {
  state = {
    state: '',
    isDeletedModalOpen: false,
    trendingNewsToDelete: {},
  };
  componentDidMount() {
    this.props.fetchTrendingNews();
  }
  createNewTrendingNews() {
    this.props.dispatch(push('/news/trends/admin/new'));
  }

  goToTrendingNewsEdit = trendingNewsData => {
    this.props.dispatch(
      push(`/news/trends/admin/${trendingNewsData._id}/edit`),
    );
  };

  routeToTrendingNewsView(selectedTrendingNews) {
    this.props.dispatch(
      push(`/news/trends/admin/${selectedTrendingNews.id}/details`),
    );
  }

  getCreatedOnDate(date) {
    const myDate = new Date(date);
    const trendingNewsCreationDate =
      myDate.getDate() +
      '/' +
      (myDate.getMonth() + 1) +
      '/' +
      myDate.getFullYear();
    return trendingNewsCreationDate;
  }

  handleChange(value) {
    this.setState({
      state: value,
    });
  }
  renderNoTrendingNewsLabel(classes) {
    return (
      <Typography variant="h4" className={classes.noTrendingNewsLabel}>
        {/* No Trending News Created */}
      </Typography>
    );
  }

  openDeleteConfirmationModal = selectedTrendingNews => {
    this.setState({
      isDeletedModalOpen: true,
      trendingNewsToDelete: selectedTrendingNews,
    });
  };

  closeDeleteConfirmationModal = () => {
    this.setState({
      isDeletedModalOpen: false,
      trendingNewsToDelete: {},
    });
  };

  onConfirmTrendingNewsDelete = () => {
    let trendingNewsData = this.state.trendingNewsToDelete;
    let {_id} = trendingNewsData
    this.props.deleteSelectedTrendingNews(_id)
  };

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  renderTrendingNews() {
    const { classes } = this.props;
    return (
      <Fragment>
        {this.props.trendingNews.map(trendingNews => (
          <TrendingNewsCards
            key={trendingNews._id}
            classes={classes}
            getCreatedOnDate={this.getCreatedOnDate}
            openDeleteConfirmationModal={this.openDeleteConfirmationModal}
            goToTrendingNewsEdit={this.goToTrendingNewsEdit}
            trendingNewsData={trendingNews}
          />
        ))}
        <RenderDeleteConfirmationModal
          isDeletedModalOpen={this.state.isDeletedModalOpen}
          closeDeleteConfirmationModal={this.closeDeleteConfirmationModal}
          onConfirmTrendingNewsDelete={this.onConfirmTrendingNewsDelete}
        />
      </Fragment>
    );
  }

  render() {
    const { classes, trendingNews, states } = this.props;
    const { state } = this.state;
    return (
      <Content>
        <Grid container spacing={16} className={classes.root}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            className={classes.createBtnContainer}
          >
          <Button
            variant="fab"
            className={classes.addButton}
            color="inherit"
            onClick={() => this.createNewTrendingNews()}
          >
            <AddIcon />
          </Button>

          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="state">State</InputLabel>
              <Select
                value={state}
                onChange={e => this.handleChange(e.target.value)}
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
        {trendingNews.length === 0
          ? this.renderNoTrendingNewsLabel(classes)
          : this.renderTrendingNews()}
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

const mapStateToProps = createStructuredSelector({
  trendingNews: makeSelectTrendingNews(),
  states: makeSelectStatesForOptions(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchTrendingNews: () => dispatch(fetchTrendingNews()),
    deleteSelectedTrendingNews: (trendingNewsId) =>
      dispatch(deleteSelectedTrendingNews(trendingNewsId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const componentWithStyles = withStyles(styles)(AdminTrendingNewsList);

export default compose(withConnect)(componentWithStyles);
