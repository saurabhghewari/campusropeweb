/**
 *
 * HelplineView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Content from 'components/Content/Loadable';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';


import {makeSelectSelectedHelpline} from './selectors'
import {fetchHelplineById} from './actions'
import Typography  from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';


const styles = theme => ({
  
});

/* eslint-disable react/prefer-stateless-function */
class HelplineView extends React.Component {

 componentDidMount() {
   const helplineId = this.props.match.params.helplineId;
   this.props.fetchHelplineById(helplineId);
 }
  render() {
    const {helpline} = this.props;
    return (
    <Content>
        <div>
          <Typography>{helpline.name}</Typography>
        </div>
        <Divider variant="middle"/>
        <div>
          <h3>Description</h3>
          <Typography variant="body2">{helpline.description}</Typography>
        </div>
        <Divider variant="middle"/>
        <div>
          Helpline Number : {helpline.helplineNumber}
        </div>
        <Divider variant="middle"/>
        <div>
          Website Link
          <a href={helpline.websiteLink} target="_blank">{helpline.websiteLink}</a>
        </div>

      <Divider variant="middle"/>
        <div>
         Link to file complaint
          <a href={helpline.linkToFileComplaint} target="_blank">{helpline.linkToFileComplaint}</a>
        </div>
    </Content>);
  }
}

HelplineView.propTypes = {
  helpline: PropTypes.object,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector ({
  helpline: makeSelectSelectedHelpline()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchHelplineById: (helplineId) => dispatch(fetchHelplineById(helplineId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const componentWithStyles = withStyles(styles)(HelplineView);

export default compose(
  withConnect,
)(componentWithStyles);