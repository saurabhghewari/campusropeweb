import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';
import { replace } from 'react-router-redux';
import { connect } from 'react-redux';
import { compose } from 'redux';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { fetchNgos } from './actions';
import NgoList from './NgoList';
import { makeSelectApprovedNgos, makeSelectPendingNgos } from './selectors';

/*eslint-disable*/

const styles = theme => ({
  createNgoBtn: {
    float: 'right',
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

  createNewNgo() {
    this.props.dispatch(replace('/app/ngos/new'));
  }

  render() {
    const { classes, pendingNgos, approvedNgos } = this.props;
    const { value } = this.state;
    return (
      <div>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="PENDING" />
            <Tab label="APPROVED" />
          </Tabs>
        </AppBar>
        {value === 0 && <NgoList ngos={pendingNgos} />}
        {value === 1 && <NgoList ngos={approvedNgos} />}
      </div>
    );
  }
}

NgoAdminVerification.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
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
