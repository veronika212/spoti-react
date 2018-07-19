import React, { Component } from 'react';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import { DataTable, FontIcon, TableHeader, TableBody, TableRow, TableColumn } from 'react-md';
import { Link } from 'react-router-dom';

import styles from './Songs.css';
import '../../App.css';
import { getSongs, deleteSong } from '../../sagas/songsSaga';
import { selectSongs } from '../../reducers/songsReducer';

class Songs extends Component {
  componentDidMount() {
    this.props.getSongs();
  }

  handleDeleteSong = id => {
    this.props.deleteSong(id);
  };

  renderArtist(song) {
    return song.track.artists.map(artist => (
      <li key={artist.id}>
        <span>
          <Link className={styles.link} to={`/artists/${artist.id}`}>
            {artist.name}
          </Link>
        </span>
      </li>
    ));
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
            <TableColumn>
              <FontIcon>query_builder</FontIcon>
            </TableColumn>
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
              <TableColumn>
                <Link className={styles.link} to={`/albums/${song.track.album.id}`}>
                  {song.track.album.name}
                </Link>
              </TableColumn>
              <TableColumn>{format(song.added_at, 'DD-MM-YYYY')}</TableColumn>
              <TableColumn>{format(song.track.duration_ms, 'm:ss')}</TableColumn>
              <TableColumn>
                <FontIcon
                  className={styles.icons}
                  onClick={() => {
                    this.handleDeleteSong(song.track.id);
                  }}
                >
                  delete
                </FontIcon>
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
        <h1 className={styles.title}>Songs</h1>
        <hr className={styles.line} />
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
  { getSongs, deleteSong }
)(Songs);
