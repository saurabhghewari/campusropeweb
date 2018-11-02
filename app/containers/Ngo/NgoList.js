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
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import format from 'date-fns/format';

/* eslint-disable*/

const styles = theme => ({
  container:{
    marginTop:theme.spacing.unit * 2,
    textAlign:'center'
  },
  media: {
    height: 100,
    width:100,
    paddingTop: '56.25%', // 16:9
  },
});

const NgoBox = ({ngoData,classes}) => {
  return(
    <Card className={classes.card}>
    <CardHeader
      avatar={
        <Avatar aria-label="Recipe" className={classes.avatar}  src={ngoData.createdBy.picture}></Avatar>
      }
      title={ngoData.name}
      subheader={<div>
        {format(new Date(ngoData.createdAt),"DD-MM-YYYY")}
        <span>{ngoData.contactEmail}</span>
      </div>}
    />
    <CardMedia
      className={classes.media}
      src={ngoData.documentLink}
      title="Contemplative Reptile"
    />
    <CardContent>
      <Typography component="p">
        This impressive paella is a perfect party dish and a fun meal to cook together with your
        guests. Add 1 cup of frozen peas along with the mussels, if you like.
      </Typography>
    </CardContent>
  </Card>
  )
}
/* eslint-disable react/prefer-stateless-function */
class NgoList extends React.Component {
  
  renderNoNgoLabel(){
    return (
    <Typography variant="h4">
      No NGO found
    </Typography>)
  }

  renderNgos(){
    const { classes } = this.props;
    return(
      <Fragment>
        {this.props.ngos.map((ngo) => <NgoBox key={ngo.id} classes={classes} ngoData={ngo}/>)}
      </Fragment>
    )
  }
  render() {
    const { classes,ngos } = this.props;
    return (
    <div className={classes.container}>
      {ngos.length === 0 ? this.renderNoNgoLabel() : this.renderNgos() }
    </div>);
  }
}

NgoList.propTypes = {
  classes: PropTypes.object.isRequired,
  ngos: PropTypes.array.isRequired,
};

export default withStyles(styles)(NgoList);
