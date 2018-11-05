/**
 *
 * NgoList
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import format from 'date-fns/format';

/* eslint-disable*/

const styles = theme => ({
  container: {
    marginTop: 60,
    textAlign: 'center',
  },
  media: {
    height: 100,
    width: 100,
    paddingTop: '56.25%', // 16:9
  },
  card: {
    minWidth: 275,
    maxWidth: 275,
    margin: theme.spacing.unit * 2,
    display: 'inline-block',
    cursor: 'pointer',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const NgoBox = ({ ngoData, classes, onNgoClick }) => {
  return (
    <Card
      className={classes.card}
      raised={true}
      onClick={() => onNgoClick(ngoData)}
    >
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          admin : {ngoData.createdBy.name}
        </Typography>
        <Typography variant="h5" component="h2">
          {ngoData.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          created on : {format(new Date(ngoData.createdAt), 'DD-MM-YYYY')}
        </Typography>
        <Typography component="p">
          contact email: {ngoData.contactEmail}
        </Typography>
      </CardContent>
    </Card>
  );
};
/* eslint-disable react/prefer-stateless-function */
class NgoList extends React.Component {
  renderNoNgoLabel() {
    return <Typography variant="h4">No NGO found</Typography>;
  }

  renderNgos() {
    const { classes, onNgoClick } = this.props;
    return (
      <Fragment>
        {this.props.ngos.map(ngo => (
          <NgoBox
            key={ngo.id}
            classes={classes}
            onNgoClick={onNgoClick}
            ngoData={ngo}
          />
        ))}
      </Fragment>
    );
  }
  render() {
    const { classes, ngos } = this.props;
    return (
      <div className={classes.container}>
        {ngos.length === 0 ? this.renderNoNgoLabel() : this.renderNgos()}
      </div>
    );
  }
}

NgoList.propTypes = {
  classes: PropTypes.object.isRequired,
  ngos: PropTypes.array.isRequired,
  onNgoClick: PropTypes.func,
};

export default withStyles(styles)(NgoList);
