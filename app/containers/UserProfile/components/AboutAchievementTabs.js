/**
 *
 * AboutAchievementTabs
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Tab from '@material-ui/core/TabC';
import { withStyles } from '@material-ui/core/styles';

import About from './About';
import Achievement from './Achievement';

const styles = () => ({});

/* eslint-disable  */
export class AboutAchievementTabs extends React.PureComponent {
  state = {
    selectedTab: 0,
  };
  handleProfileTabChange = selectedTab => {
    this.setState({
      selectedTab,
    });
  };

  render() {
    const { classes } = this.props;
    const { selectedTab } = this.state;
    return (
      <div className={classes.root}>
        <Tabs
          value={selectedTab}
          onChange={(e, value) => this.handleProfileTabChange(value)}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="About" value={0} />
          <Tab label="Achievements" value={1} />
        </Tabs>
        {selectedTab === 0 && (
          <div>
            <About />
          </div>
        )}
        {selectedTab === 1 && (
          <div>
            <Achievement />
          </div>
        )}
      </div>
    );
  }
}

AboutAchievementTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const componentWithStyles = withStyles(styles)(AboutAchievementTabs);

export default withConnect(componentWithStyles);
