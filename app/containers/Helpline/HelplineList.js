/**
 *
 * HelplineList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Content from 'components/Content/Loadable';

/* eslint-disable react/prefer-stateless-function */
class HelplineList extends React.Component {
  render() {
    return <Content />;
  }
}

HelplineList.propTypes = {
  helplines: PropTypes.array,
};

export default HelplineList;
