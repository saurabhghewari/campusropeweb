/**
 *
 * HelplineUserList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Content from 'components/Content/Loadable';

/* eslint-disable react/prefer-stateless-function */
class HelplineUserList extends React.Component {
  render() {
    return <Content />;
  }
}

HelplineUserList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default HelplineUserList;
