/**
 *
 * HelplineList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

const HelplineBox = ({ helplineData, classes, onHelplineClick }) => {
  return (
    <Card className={classes.card}>
      <CardActionArea onClick={() => onHelplineClick(helplineData) }>
        <CardContent>
          <Typography classname={classes.heading}gutterBottom variant="h5" component="h2">
            {helplineData.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
/* eslint-disable react/prefer-stateless-function */
class HelplineList extends React.Component {
  render() {
    const { classes, helplines, onHelplineCLick } = this.props;
    return (
      <Fragment>
      {helplines.map(helpline => (
        <HelplineBox
            key={trendingNew.id}
            classes={classes}
            onHelplineCLick={onHelplineCLick}
            helplineData={helpline}
        />
      ))}
      </Fragment>
    )}
}

HelplineListHelplineList.propTypes = {
  helplines: PropTypes.array,
  onHelplineCLick: PropTypes.func,
};

export default HelplineList;
