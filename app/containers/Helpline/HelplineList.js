/**
 *
 * HelplineList
 *
 */

import React,{Fragment} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  
  
});

const HelplineBox = ({ helplineData, classes, onHelplineClick }) => (
  <Card className={classes.card}>
    <CardActionArea onClick={() => onHelplineClick(helplineData)}>
      <CardContent>
        <Typography
          className={classes.heading}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {helplineData.name}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);
/* eslint-disable react/prefer-stateless-function */
class HelplineList extends React.Component {
  render() {
    const { classes, helplines, onHelplineCLick } = this.props;
    return (
      <Fragment>
        {helplines.map(helpline => (
          <HelplineBox
            key={helpline._id}
            classes={classes}
            onHelplineCLick={onHelplineCLick}
            helplineData={helpline}
          />
        ))}
      </Fragment>
    );
  }
}

HelplineList.propTypes = {
  helplines: PropTypes.array,
  onHelplineCLick: PropTypes.func,
};

const componentWithStyles = withStyles(styles)(HelplineList);

export default componentWithStyles;
