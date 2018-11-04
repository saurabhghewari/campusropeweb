/**
 *
 * NgoList
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import format from 'date-fns/format';
import { createStructuredSelector } from 'reselect';
import { replace } from 'react-router-redux';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';
import _isEmpty from 'lodash/isEmpty';
import IdealImage from 'react-ideal-image';
import { fetchNgoById } from './actions';
import { makeSelectInViewNgo } from './selectors';

/* eslint-disable*/

const styles = theme => ({
    container: {
        textAlign: 'center'
    }
});

/* eslint-disable react/prefer-stateless-function */
class NgoVerificationView extends React.Component {

    componentDidMount() {
        const ngoId = this.props.match.params.ngoId;
        this
            .props
            .fetchNgoById(ngoId)
    }

    onCancelClick(){
        this.props.dispatch(replace('/app/ngos/verification'))
    }

    approvedNgoButtons(){
        return(
            <div>
                <Button variant="contained">
                Reject
                </Button>
                <Button variant="contained" onClick={() => this.onCancelClick()}>
                    Cancel
                </Button>
            </div>
        )
    }

    pendingNgoButtons(){
        return( <div>
                <Button variant="contained">
                    Approve
                </Button>
                <Button variant="contained">
                    Reject
                </Button>
                <Button variant="contained" onClick={() => this.onCancelClick()}>
                    Cancel
                </Button>
            </div>)
    }

    renderActions(ngo){
        switch(ngo.status){
            case 'APPROVED':{
                return this.approvedNgoButtons()
            }
            case 'PENDING':{
                return this.pendingNgoButtons()
            }
        }
    }

    render() {
        const {classes, ngo} = this.props;
        return (
            <div>
                {
                    !_isEmpty(ngo) && (
                        <Fragment>
                                <Typography
                                    className={classes.title}
                                    color="textSecondary"
                                    gutterBottom={true}>
                                    admin : {ngo.createdBy.name}
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    {ngo.name}
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    created on : {format(new Date(ngo.createdAt), "DD-MM-YYYY")}
                                </Typography>
                                <IdealImage
                                placeholder={{color:'grey'}}
                                srcSet={[{src: ngo.documentLink, width: 100,height:100}]}
                                alt="cancelled check pic"
                                width={100}
                                height={100}
                                />
                                <Typography component="p">
                                    contact email: {ngo.contactEmail}
                                </Typography>
                                {this.renderActions(ngo)}
                        </Fragment>
                    )
                }
            </div>
        );
    }
}

NgoVerificationView.propTypes = {
    classes: PropTypes.object.isRequired,
    ngo: PropTypes.object.isRequired
};
const mapStateToProps = createStructuredSelector({ngo: makeSelectInViewNgo()});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        fetchNgoById: (ngoId) => dispatch(fetchNgoById(ngoId))
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps,);

export default compose(withStyles(styles), withConnect,)(NgoVerificationView);