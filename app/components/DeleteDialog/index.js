/**
 *
 * Delete Confirmation Dialog
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
    message: {
      display: 'flex',
      alignItems: 'center',
    },
});

function MyDialogTitle(props){
    const { title } = props

    return(
        <DialogTitle id="customized-dialog-title">
            { title }
        </DialogTitle>
    )
}

function MyDialogContent(props) {
    const { classes, className, title, confirmationText, handleClose, onDelete } = props;

    return (
        <React.Fragment>
            <DialogContent className={classNames(classes, className)}>
                <MyDialogTitle title={ title } />
                { confirmationText }
            </DialogContent>
            <MyDialogActions handleClose = { handleClose } onDelete={ onDelete }/>
        </React.Fragment>
    )
}

function MyDialogActions(props) {
    
    const { handleClose, onDelete } = props

    return (
        <React.Fragment>
            <Button onClick={handleClose} color="primary" autoFocus>
                No
            </Button>
            <Button onClick={onDelete} color="primary">
                Yes
            </Button>
        </React.Fragment>
    )
}

const MyDialogContentWrapper = withStyles(styles)(MyDialogContent)

const styles2 = theme => ({
    margin: {
      margin: theme.spacing.unit,
    },
})

class CustomizedDialog extends React.PureComponent {
    
    state = {
        open: true,
    };

    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { title, confirmationText, onDelete } = this.props

        return (
            <Dialog
                onClose={ this.handleClose }
                aria-labelledby="customized-dialog"
                open={this.state.open}
            >
                <MyDialogContentWrapper 
                    confirmationText={confirmationText}
                    title={title}
                    handleClose={ this.handleClose }
                    onDelete={ onDelete }
                />
            </Dialog>
        )
    }
}

export default withStyles(styles2)(CustomizedDialog)
