import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, TextField } from 'react-md';

import { createPlaylist } from '../../sagas/playlistFormSaga';

import styles from './PlaylistForm.css';

class PlaylistForm extends Component {
  state = {
    name: '',
    description: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, description } = this.state;
    this.props.createPlaylist(name, description);
    this.setState({ name: '', description: '' });
    this.props.submitCallback();
    // console.log('form submited');
  };

  onInputChange = (value, name) => {
    this.setState({
      [name]: value,
    });
  };
  render() {
    // const { name, description } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className={styles.formPlaylist}>
        <div className="md-grid">
          <TextField
            id="counter-field"
            label="Name"
            lineDirection="center"
            placeholder="New Playlist"
            maxLength={20}
            className="md-cell md-cell--bottom"
            style={{ width: '100%' }}
            onChange={value => this.onInputChange(value, 'name')}
          />

          <TextField
            id="multiline-counter-field"
            label="Description"
            placeholder="Give your playlist a catchy description"
            rows={3}
            maxLength={200}
            className="md-cell md-cell--bottom"
            style={{ width: '100%' }}
            onChange={value => this.onInputChange(value, 'description')}
          />
        </div>
        <Button flat primary onClick={this.handleSubmit}>
          Confirm
        </Button>

        {/* <div>
          <label>Name</label>
          <input
            name="name"
            type="text"
            placeholder="New Playlist"
            value={name}
            onChange={e => this.onInputChange(e, 'name')}
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            type="text"
            rows="5"
            placeholder="Give your playlist a catchy description"
            value={description}
            onChange={e => this.onInputChange(e, 'description')}
          />
        </div> */}

        {/* <button type="submit">Create</button> */}
      </form>
    );
  }
}

export default connect(
  null,
  { createPlaylist }
)(PlaylistForm);
