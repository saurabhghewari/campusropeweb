/**
 *
 * HelplineEdit
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Content from 'components/Content/Loadable';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { makeSelectSelectedHelpline } from './selectors';
import {
  fetchHelplineById,
  updateHelplineById,
  deleteHelpline,
} from './actions';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import InlineEdit from '../../components/InlineEdit/Loadable';

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
    pointerEvents: 'none',
    cursor: 'pointer',
  },
  deleteButton: {
    marginLeft: 15,
  },
});

/* eslint-disable react/prefer-stateless-function */
class HelplineEdit extends React.Component {
  componentDidMount() {
    const helplineId = this.props.match.params.helplineId;
    this.props.fetchHelplineById(helplineId);
  }

  onInlineEditFocusOut(propName, newValue) {
    this.props.updateHelplineById({
      _id: this.props.helpline._id,
      data: {
        [propName]: newValue,
      },
    });
  }

  delete() {
    this.props.deleteHelplineId(this.props.helpline._id);
  }

  cancel() {
    this.props.dispatch(replace('/app/helpline/admin'));
  }

  render() {
    const { helpline, classes } = this.props;
    return (
      <Content>
        <div className={classes.name}>
          <InlineEdit
            text={helpline.name}
            variant="h3"
            onFocusOut={newValue => this.onInlineEditFocusOut('name', newValue)}
          />
        </div>
        <Divider variant="middle" />
        <div className={classes.description}>
          <h4>Description</h4>
          <InlineEdit
            text={helpline.description}
            variant="body2"
            onFocusOut={newValue =>
              this.onInlineEditFocusOut('description', newValue)
            }
          />
        </div>
        <Divider variant="middle" />
        <div className={classes.number}>
          <Typography variant="body2">
            Helpline Number : {helpline.helplineNumber}
          </Typography>
          <InlineEdit
            text={helpline.helplineNumber}
            variant="body2"
            onFocusOut={newValue =>
              this.onInlineEditFocusOut('helplineNumber', newValue)
            }
          />
        </div>
        <Divider variant="middle" />
        <div className={classes.siteLink}>
          Website Link
          <InlineEdit
            text={helpline.websiteLink}
            variant="body2"
            component={() => (
              <a
                className={classes.link}
                href={`https://${helpline.websiteLink}`}
                target="_blank"
              >
                {helpline.websiteLink}
              </a>
            )}
            onFocusOut={newValue =>
              this.onInlineEditFocusOut('websiteLink', newValue)
            }
          />
        </div>

        <Divider variant="middle" />
        <div className={classes.complaintLink}>
          Link to file complaint
          <InlineEdit
            text={helpline.linkToFileComplaint}
            variant="body2"
            component={() => (
              <a
                className={classes.link}
                href={helpline.linkToFileComplaint}
                target="_blank"
              >
                {helpline.linkToFileComplaint}
              </a>
            )}
            onFocusOut={newValue =>
              this.onInlineEditFocusOut('linkToFileComplaint', newValue)
            }
          />
        </div>
        <div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => this.cancel()}
          >
            {' '}
            Cancel
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => this.delete()}
            className={classes.deleteButton}
          >
            {' '}
            Delete
          </Button>
        </div>
      </Content>
    );
  }
}

HelplineEdit.propTypes = {
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
    updateHelplineById: updatedHelpline =>
      dispatch(updateHelplineById(updatedHelpline)),
    deleteHelplineId: helplineId => dispatch(deleteHelpline(helplineId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const componentWithStyles = withStyles(styles)(HelplineEdit);

export default compose(withConnect)(componentWithStyles);
