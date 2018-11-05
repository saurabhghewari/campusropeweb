/**
 *
 * NgoList
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import format from 'date-fns/format';
import { createStructuredSelector } from 'reselect';
import { replace } from 'react-router-redux';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';
import _isEmpty from 'lodash/isEmpty';
import IdealImage from 'react-ideal-image';
import { fetchNgoById, updateNgo } from './actions';
import { makeSelectInViewNgo } from './selectors';
import { makeSelectStatuses } from '../../store/constants/selectors';

/* eslint-disable*/

const styles = theme => ({
  container: {
    textAlign: 'center',
  },
  button: {
    margin: 10,
  },
});

/* eslint-disable react/prefer-stateless-function */
class NgoVerificationView extends React.Component {
  componentDidMount() {
    const ngoId = this.props.match.params.ngoId;
    this.props.fetchNgoById(ngoId);
  }

  onCancelClick() {
    this.props.dispatch(replace('/app/ngos/verification'));
  }

  onApproveNgo() {
    const { ngo, status } = this.props;
    const updatedNgo = {
      ...ngo,
      createdBy: ngo.createdBy.id,
      status: status.APPROVED,
    };
    this.props.updateNgo(updatedNgo);
  }

  onRejectNgo() {
    const { ngo, status } = this.props;
    const updatedNgo = {
      ...ngo,
      createdBy: ngo.createdBy.id,
      status: status.REJECTED,
    };
    this.props.updateNgo(updatedNgo);
  }

  approvedNgoButtons() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => this.onRejectNgo()}
        >
          Reject
        </Button>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => this.onCancelClick()}
        >
          Cancel
        </Button>
      </div>
    );
  }

  pendingNgoButtons() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => this.onApproveNgo()}
        >
          Approve
        </Button>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => this.onRejectNgo()}
        >
          Reject
        </Button>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => this.onCancelClick()}
        >
          Cancel
        </Button>
      </div>
    );
  }

  renderActions(ngo) {
    const { status } = this.props;

    switch (ngo.status) {
      case status.APPROVED: {
        return this.approvedNgoButtons();
      }
      case status.PENDING: {
        return this.pendingNgoButtons();
      }
    }
  }

  render() {
    const { classes, ngo } = this.props;
    return (
      <div>
        {!_isEmpty(ngo) && (
          <Fragment>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              admin : {ngo.createdBy.name}
            </Typography>
            <Typography variant="h5" component="h2">
              {ngo.name}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              created on : {format(new Date(ngo.createdAt), 'DD-MM-YYYY')}
            </Typography>
            <IdealImage
              placeholder={{ color: 'grey' }}
              srcSet={[{ src: ngo.documentLink, width: 100, height: 100 }]}
              alt="cancelled check pic"
              width={100}
              height={100}
            />
            <Typography component="p">
              contact email: {ngo.contactEmail}
            </Typography>
            {this.renderActions(ngo)}
          </Fragment>
        )}
      </div>
    );
  }
}

NgoVerificationView.propTypes = {
  classes: PropTypes.object.isRequired,
  ngo: PropTypes.object.isRequired,
};
const mapStateToProps = createStructuredSelector({
  ngo: makeSelectInViewNgo(),
  status: makeSelectStatuses(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchNgoById: ngoId => dispatch(fetchNgoById(ngoId)),
    updateNgo: ngo => dispatch(updateNgo(ngo)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withStyles(styles),
  withConnect,
)(NgoVerificationView);
