import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import bgImage from 'images/loginbg.jpg';
import { Add } from '@material-ui/icons';
import { Paper, Avatar, Button, TextField } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = () => ({
  addPostField: {
    margin: 0,
    marginLeft: '30px',
  },
  addPostBtnSection: {
    justifyContent: 'space-between',
  },
  addPostTopSection: {
    marginBottom: 20,
    alignItems: 'flex-end',
  },
  addPostSection: {
    display: 'flex',
    padding: '10px',
  },
  postAvatar: {
    width: 70,
    height: 70,
  },
});

const AddPostComponent = props => {
  const { classes } = props;

  return (
    <Paper>
      <div
        className={classNames(
          classes.addPostTopSection,
          classes.addPostSection,
        )}
      >
        <Avatar
          alt="Adelle Charles"
          src={bgImage}
          className={classes.postAvatar}
        />

        <TextField
          label="What's new ?"
          className={classes.addPostField}
          margin="normal"
          multiline
          fullWidth
        />
      </div>

      <div
        className={classNames(
          classes.addPostBtnSection,
          classes.addPostSection,
        )}
      >
        <span>
          <Button variant="contained" color="primary">
            <Add /> Photo
          </Button>
        </span>

        <Button variant="contained" color="primary">
          Post
        </Button>
      </div>
    </Paper>
  );
};

AddPostComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddPostComponent);
