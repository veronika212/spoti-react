import React, { Component } from 'react';
import { DialogContainer, Button, List, ListItem, Paper, FocusContainer } from 'react-md';

class DialogWindow extends Component {
  show = () => {
    const { onShowCallback } = this.props;
    if (onShowCallback) {
      onShowCallback();
    }
  };

  hide = () => {
    const { onHideCallback } = this.props;
    if (onHideCallback) {
      onHideCallback();
    }
  };

  handleKeyDown = e => {
    const key = e.which || e.keyCode;
    if (key === 13 || key === 32) {
      // also close on enter or space keys
      this.hide();
    }
  };

  render() {
    const { title, visible } = this.props;

    return (
      <DialogContainer
        id="simple-list-dialog"
        visible={visible}
        title={title}
        onHide={this.hide}
        focusOnMount={false}
      >
        {this.props.children}
      </DialogContainer>
    );
  }
}

export default DialogWindow;
