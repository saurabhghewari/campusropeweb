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

import { makeSelectSelectedHelpline } from './selectors';
import { fetchHelplineById } from './actions';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  name: {
    textAlign: 'center',
    padding: theme.spacing.unit * 2,
  },
  description: {
    textAlign: 'center',
    padding: theme.spacing.unit * 2,
    wordBreak: 'break-all',
  },
  number: {
    textAlign: 'center',
    padding: theme.spacing.unit * 2,
  },
  siteLink: {
    textAlign: 'center',
    padding: theme.spacing.unit * 2,
  },
  complaintLink: {
    textAlign: 'center',
    padding: theme.spacing.unit * 2,
  },
  link: {
    marginLeft: theme.spacing.unit,
  },
});

/* eslint-disable react/prefer-stateless-function */
class HelplineView extends React.Component {
  componentDidMount() {
    const helplineId = this.props.match.params.helplineId;
    this.props.fetchHelplineById(helplineId);
  }
  render() {
    const { helpline, classes } = this.props;
    return (
      <Content>
        <div className={classes.name}>
          <Typography variant="h3">{helpline.name}</Typography>
        </div>
        <Divider variant="middle" />
        <div className={classes.description}>
          <h4>Description</h4>
          <Typography variant="body2">{helpline.description}</Typography>
        </div>
        <Divider variant="middle" />
        <div className={classes.number}>
          <Typography variant="body2">
            Helpline Number : {helpline.helplineNumber}
          </Typography>
        </div>
        <Divider variant="middle" />
        <div className={classes.siteLink}>
          Website Link
          <a
            className={classes.link}
            href={`${helpline.websiteLink}`}
            target="_blank"
          >
            {helpline.websiteLink}
          </a>
        </div>

        <Divider variant="middle" />
        <div className={classes.complaintLink}>
          Link to file complaint
          <a
            className={classes.link}
            href={helpline.linkToFileComplaint}
            target="_blank"
          >
            {helpline.linkToFileComplaint}
          </a>
        </div>
      </Content>
    );
  }
}

HelplineView.propTypes = {
  helpline: PropTypes.object,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  helpline: makeSelectSelectedHelpline(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchHelplineById: helplineId => dispatch(fetchHelplineById(helplineId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const componentWithStyles = withStyles(styles)(HelplineView);

export default compose(withConnect)(componentWithStyles);
