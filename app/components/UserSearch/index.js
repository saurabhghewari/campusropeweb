/**
 *
 * UserSearch
 *
 */

/* eslint-disable react/prop-types, react/jsx-handler-names */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';

import Search from 'components/Search/Loadable';

import { searchUser } from './api';

const styles = () => ({
  root: {
    flexGrow: 1,
    marginBottom: 20,
  },
  input: {
    display: 'flex',
    padding: 0,
  },
});
/* eslint-disable*/
class UserSearch extends React.Component {
  state = {
    selectedUser: null,
  };

  users = [];

  handleChange = selected => {
    this.setState({
      selectedUser: selected,
    });
    if(selected.value){
    this.props.onSelectUser(selected.value);
    }
  };

  render() {
    const { classes } = this.props;

    const createOptions = users =>
      users.map(user => ({ label: user.name, value: user._id }));

    const loadOptions = (inputValue, callback) => {
      searchUser(inputValue).then(users => callback(createOptions(users)));
    };

    return (
      <div className={classes.root}>
        <NoSsr>
          <Search
            options={this.users}
            value={this.state.selectedUser}
            loadOptions={loadOptions}
            onChange={this.handleChange}
            placeholder="Search for a user by typing name"
          />
        </NoSsr>
      </div>
    );
  }
}

UserSearch.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  onSelectUser: PropTypes.func,
};

export default withStyles(styles, { withTheme: true })(UserSearch);
