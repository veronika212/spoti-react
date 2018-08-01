import React, { Component } from 'react';
import { Button, DialogContainer } from 'react-md';

// import styles from './DialogWindow.css';

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
    const { title, visible, width, height } = this.props;

    const actions = [];

    return (
      <DialogContainer
        id="simple-list-dialog"
        visible={visible}
        title={title}
        onHide={this.hide}
        actions={actions}
        focusOnMount={false}
        width={width}
        height={height}
      >
        {this.props.children}

        <Button flat secondary onClick={this.hide}>
          Cencel
        </Button>
      </DialogContainer>
    );
  }
}

export default DialogWindow;
