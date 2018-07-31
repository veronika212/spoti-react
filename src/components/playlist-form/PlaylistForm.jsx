import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createPlaylist } from '../../sagas/playlistFormSaga';

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
    console.log('form submited');
  };

  onInputChange = (e, name) => {
    const { value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  render() {
    const { name, description } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
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
        </div>

        <button type="submit">Create</button>
      </form>
    );
  }
}

export default connect(
  null,
  { createPlaylist }
)(PlaylistForm);
