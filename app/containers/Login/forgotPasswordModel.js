import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ForgotPasswordModal = ({ handleClose, handleSubmitEmail, openModal }) => {
  let email = '';

  const handleEmailChange = event => {
    email = event.target.value;
  };

  const handleEmailSubmit = () => {
    if (!email) return;
    handleSubmitEmail(email);
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Forgot Password</DialogTitle>

        <DialogContent>
          <DialogContentText>
            To change your password, please enter your email address here. We
            will send forgot password link to your email.
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            onChange={handleEmailChange}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEmailSubmit} value="Submit" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ForgotPasswordModal.propTypes = {
  handleClose: PropTypes.func,
  handleSubmitEmail: PropTypes.func,
  openModal: PropTypes.bool,
};

export default ForgotPasswordModal;
