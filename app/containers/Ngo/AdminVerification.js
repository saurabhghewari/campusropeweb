import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { compose } from 'redux';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { fetchNgos } from './actions';
import NgoList from './NgoList';
import { makeSelectApprovedNgos, makeSelectPendingNgos } from './selectors';

const styles = theme => ({
  createNgoBtn: {
    float: 'right',
    marginBottom: theme.spacing.unit,
  },
  container: {
    display: 'block',
  },
});

class NgoAdminVerification extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentDidMount() {
    this.props.fetchNgos();
  }

  routeToNgoVerifyView(ngo) {
    this.props.dispatch(push(`/ngos/${ngo._id}/verify/details`));
  }

  render() {
    const { classes, pendingNgos, approvedNgos } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.container}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="PENDING" />
            <Tab label="APPROVED" />
          </Tabs>
        </AppBar>
        {value === 0 && (
          <NgoList
            ngos={pendingNgos}
            onNgoClick={ngo => this.routeToNgoVerifyView(ngo)}
          />
        )}
        {value === 1 && (
          <NgoList
            ngos={approvedNgos}
            onNgoClick={ngo => this.routeToNgoVerifyView(ngo)}
          />
        )}
      </div>
    );
  }
}

NgoAdminVerification.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  fetchNgos: PropTypes.func.isRequired,
  pendingNgos: PropTypes.array.isRequired,
  approvedNgos: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  approvedNgos: makeSelectApprovedNgos(),
  pendingNgos: makeSelectPendingNgos(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchNgos: () => dispatch(fetchNgos()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withStyles(styles),
  withConnect,
)(NgoAdminVerification);
