import React, { Component } from 'react';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import { FontIcon } from 'react-md';

import { DataTable, TableHeader, TableBody, TableRow, TableColumn } from 'react-md';

// import styles from './Songs.css';
import { getSongs } from '../../sagas/songsSaga';
import { selectSongs } from '../../reducers/songsReducer';

class Songs extends Component {
  componentDidMount() {
    this.props.getSongs();
  }

  renderArtist(song) {
    return song.track.artists.map(artist => <li key={artist.id}>{artist.name}</li>);
  }

  renderSong() {
    const { songs } = this.props;
    return (
      <DataTable plain>
        <TableHeader>
          <TableRow>
            <TableColumn>Title</TableColumn>
            <TableColumn>Artists</TableColumn>
            <TableColumn>Album</TableColumn>
            <TableColumn>Added at</TableColumn>
            <TableColumn>Time</TableColumn>
            <TableColumn>Delete</TableColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {songs.map(song => (
            <TableRow key={song.track.id}>
              <TableColumn>{song.track.name}</TableColumn>
              <TableColumn>
                <ul>{this.renderArtist(song)}</ul>
              </TableColumn>
              <TableColumn>{song.track.album.name}</TableColumn>
              <TableColumn>{format(song.added_at, 'DD-MM-YYYY')}</TableColumn>
              <TableColumn>{format(song.track.duration_ms, 'm:ss')}</TableColumn>
              <TableColumn>
                <FontIcon>delete</FontIcon>
              </TableColumn>
            </TableRow>
          ))}
        </TableBody>
      </DataTable>
    );
  }

  render() {
    return (
      <div>
        <ul>{this.renderSong()}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    songs: selectSongs(state),
  };
};

export default connect(
  mapStateToProps,
  { getSongs }
)(Songs);
