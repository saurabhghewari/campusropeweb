/**
 *
 * HelplineAdd
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Content from 'components/Content/Loadable';

/* eslint-disable react/prefer-stateless-function */
class HelplineAdd extends React.Component {
  render() {
    return <Content />;
  }
}

HelplineAdd.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default HelplineAdd;
