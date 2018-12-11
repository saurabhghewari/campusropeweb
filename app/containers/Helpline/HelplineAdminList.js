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
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import green from '@material-ui/core/colors/green';

import { fetchHelplines } from './actions';
import HelplineList from './HelplineList';
import { makeSelectStates } from '../../store/constants/selectors';
import { makeSelectHelplines } from './selectors';

const styles = theme => ({
  root: {
    position: 'relative',
  },
  addButton: {
    position: 'absolute',
    right: theme.spacing.unit * 2,
    color: theme.palette.common.white,
    backgroundColor: green[500],
  },
  stateSelect: {
    marginTop: theme.spacing.unit * 6,
  },
});

/* eslint-disable react/prefer-stateless-function */
class HelplineAdminList extends React.Component {
  state = {
    selectedOperatingState: '',
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
      replace(`/app/helpline/${clickedHelpline._id}/admin/edit`),
    );
  }

  createNewHelpline() {
    this.props.dispatch(replace(`/helpline/new`));
  }

  render() {
    const { helplines, states, classes } = this.props;
    const { selectedOperatingState } = this.state;
    const allStates = states.concat(['all']);
    return (
      <Content>
        <div className={classes.root}>
          <Button
            variant="fab"
            className={classes.addButton}
            color="inherit"
            onClick={() => this.createNewHelpline()}
          >
            <AddIcon />
          </Button>
          <FormControl
            margin="normal"
            fullWidth
            className={classes.stateSelect}
          >
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
        </div>
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
    fetchHelplines: state => dispatch(fetchHelplines(state)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const componentWithStyles = withStyles(styles)(HelplineAdminList);

export default compose(withConnect)(componentWithStyles);
