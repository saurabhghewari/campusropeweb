
/**
 *
 * HelplineAdminList
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
class HelplineAdminList extends React.Component {
  state = {
    selectedOperatingState: '',
  };

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
    return (
      <Content>
        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="state">State</InputLabel>
          <Select
            value={selectedOperatingState}
            onChange={e =>
              this.setState({ selectedOperatingState: e.target.value })
            }
            input={<Input id="state" name="state" />}
          >
            {states.map(state => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <HelplineList
          helplines={helplines}
          onHelplineCLick={clickedHelpline =>
            this.routeToHelplineView(clickedHelpline)
          }
        />
      </Content>
    );
  }
}

HelplineAdminList.propTypes = {
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
    fetchHelplines: () => dispatch(fetchHelplines()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const componentWithStyles = withStyles(styles)(HelplineAdminList);

export default compose(withConnect)(componentWithStyles);
