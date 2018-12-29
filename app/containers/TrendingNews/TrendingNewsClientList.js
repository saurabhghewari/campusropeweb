/**
 *
 * TrendingNewsClientList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Content from 'components/Content/Loadable';
import { withStyles } from '@material-ui/core/styles';
import { push } from 'react-router-redux';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';

import { fetchNewsClients, deleteNewsClient } from './actions';
import { makeSelectNewsClients } from './selectors';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
  card: {
    marginBottom: theme.spacing.unit * 2,
  },
  addClient: {
    marginBottom: theme.spacing.unit * 2,
  },
});

/* eslint-disable*/

/* eslint-disable react/prefer-stateless-function */
export class TrendingNewsClientList extends React.Component {
  
  componentDidMount() {
    this.props.fetchNewsClients();
  }

  handleDeleteClient(client) {
    this.props.deleteNewsClient(client)
  }
  

  render() {
    const { newsClients,classes } = this.props;
    return (
      <Content withPaper={true}>
         <Button
                      variant="contained"
                      onClick={() => this.props.dispatch(push('/news/trends/admin/client/new'))}
                      className={classes.addClient}
                    >
                      {' '}
                      Add clients
                    </Button>
          {newsClients.map((client) => (
          <Card key={client._id} className={classes.card}>
            <CardHeader
            avatar={
                <Avatar aria-label="Recipe" src={client.logourl} className={classes.avatar}/>
            }
            action={
                <IconButton onClick={() => this.handleDeleteClient(client) }>
                  <DeleteIcon />
                </IconButton>
              }
            title={client.name}
            />
        </Card>))}
      </Content>
    );
  }
}

TrendingNewsClientList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  fetchNewsClients: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  newsClients: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  newsClients: makeSelectNewsClients(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchNewsClients: () => dispatch(fetchNewsClients()),
    deleteNewsClient: (client) => dispatch(deleteNewsClient(client)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const componentWithStyles = withStyles(styles)(TrendingNewsClientList);

export default compose(withConnect)(componentWithStyles);
