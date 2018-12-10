/**
 *
 * AboutAchievementTabs
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles'


const styles = () => ({});

/* eslint-disable  */
export class AboutAchievementTabs extends React.PureComponent {
  render() {
    const { classes} = this.props;
    return (
      <div className={classes.root}>
       
      </div>
    );
  }
}

AboutAchievementTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

const componentWithStyles = withStyles(styles)(AboutAchievementTabs);

export default componentWithStyles;
