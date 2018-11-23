/**
 *
 * InlineEdit
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export default class InlineEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: this.props.isEditing || false,
      text: this.props.text || '',
    };

    this.handleFocus = this.handleFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleFocus() {
    if (this.state.isEditing) {
      if (typeof this.props.onFocusOut === 'function') {
        this.props.onFocusOut(this.state.text);
      }
    } else if (typeof this.props.onFocus === 'function') {
      this.props.onFocus(this.state.text);
    }

    this.setState({
      isEditing: !this.state.isEditing,
    });
  }

  handleChange() {
    this.setState({
      text: this.textInput.value,
    });
  }

  render() {
    if (this.state.isEditing) {
      return (
        <div>
          <TextField
            type="text"
            className={this.props.inputClassName}
            ref={input => {
              this.textInput = input;
            }}
            value={this.state.text}
            onChange={this.handleChange}
            onBlur={this.handleFocus}
            style={{
              width: this.props.inputWidth,
              height: this.props.inputHeight,
              fontSize: this.props.inputFontSize,
              fontWeight: this.props.inputFontWeight,
              borderWidth: this.props.inputBorderWidth,
            }}
            maxLength={this.props.inputMaxLength}
            placeholder={this.props.inputPlaceHolder}
            tabIndex={this.props.inputTabIndex}
            autoFocus
          />
        </div>
      );
    }

    return (
      <div>
        <Typography
          invarient="body2"
          className={this.props.labelClassName}
          onClick={this.handleFocus}
          style={{
            fontSize: this.props.labelFontSize,
            fontWeight: this.props.labelFontWeight,
          }}
        >
          {this.state.text}
        </Typography>
      </div>
    );
  }
}

InlineEdit.propTypes = {
  text: PropTypes.string.isRequired,
  isEditing: PropTypes.bool,

  labelClassName: PropTypes.string,
  labelFontSize: PropTypes.string,
  labelFontWeight: PropTypes.string,

  inputMaxLength: PropTypes.number,
  inputPlaceHolder: PropTypes.string,
  inputTabIndex: PropTypes.number,
  inputWidth: PropTypes.string,
  inputHeight: PropTypes.string,
  inputFontSize: PropTypes.string,
  inputFontWeight: PropTypes.string,
  inputClassName: PropTypes.string,
  inputBorderWidth: PropTypes.string,

  onFocus: PropTypes.func,
  onFocusOut: PropTypes.func,
};
