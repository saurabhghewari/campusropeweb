/**
 *
 * HelplineView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Content from 'components/Content/Loadable';

/* eslint-disable react/prefer-stateless-function */
class HelplineView extends React.Component {
  render() {
    return <Content />;
  }
}

HelplineView.propTypes = {
  helpline: PropTypes.object,
  classes: PropTypes.object.isRequired,
};

export default HelplineView;
