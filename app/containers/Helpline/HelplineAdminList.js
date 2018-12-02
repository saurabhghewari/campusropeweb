/**
 *
 * HelplineAdminList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Content from 'components/Content/Loadable';

/* eslint-disable react/prefer-stateless-function */
class HelplineAdminList extends React.Component {
  render() {
    return <Content />;
  }
}

HelplineAdminList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default HelplineAdminList;
