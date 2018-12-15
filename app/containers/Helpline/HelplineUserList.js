/**
 *
 * HelplineUserList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { replace } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import Content from 'components/Content/Loadable';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import { fetchHelplines } from './actions';
import HelplineList from './HelplineList';
import { makeSelectStates } from '../../store/constants/selectors';
import { makeSelectHelplines } from './selectors';

const styles = theme => ({});

/* eslint-disable react/prefer-stateless-function */
class HelplineUserList extends React.Component {
  state = {
    selectedOperatingState: 'All',
  };

  onStateChanged(state) {
    this.setState({ selectedOperatingState: state });
    this.props.fetchHelplines(state);
  }

  componentDidMount() {
    this.props.fetchHelplines();
  }

  routeToHelplineView(clickedHelpline) {
    this.props.dispatch(
      replace(`/app/helpline/${clickedHelpline._id}/details`),
    );
  }

  render() {
    const { helplines, states } = this.props;
    const { selectedOperatingState } = this.state;
    const allStates = states.concat(['All']);
    return (
      <Content>
        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="state">State</InputLabel>
          <Select
            value={selectedOperatingState}
            onChange={e => this.onStateChanged(e.target.value)}
            input={<Input id="state" name="state" />}
          >
            {allStates.map(state => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <HelplineList
          helplines={helplines}
          onHelplineClick={clickedHelpline =>
            this.routeToHelplineView(clickedHelpline)
          }
        />
      </Content>
    );
  }
}

HelplineUserList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  helplines: PropTypes.array.isRequired,
  states: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  helplines: makeSelectHelplines(),
  states: makeSelectStates(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchHelplines: state => dispatch(fetchHelplines(state)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const componentWithStyles = withStyles(styles)(HelplineUserList);

export default compose(withConnect)(componentWithStyles);
