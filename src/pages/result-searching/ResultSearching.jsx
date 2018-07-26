import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import { albums, artists, playlists, tracks } from '../../reducers/searchReducer';
import styles from './ResultSearching.css';

let cx = classNames.bind(styles);

class ResultSearching extends Component {
  renderSongs() {
    const { tracks } = this.props;
    return tracks.items.map(track => {
      return (
        <li className={styles.itemSearch} key={track.id}>
          <Link to={`/albums/${track.album.id}`}>
            <img
              className={styles.searchImg}
              src={track.album.images[2].url}
              alt="albumImage/64/64"
            />
          </Link>
          <p className={styles.text}>{track.name}</p>
          <p>
            {track.artists.map(artist => (
              <span key={artist.id}>
                <Link
                  className={cx(styles.link, styles.text, styles.text_name)}
                  to={`/artists/${artist.id}`}
                >
                  {artist.name}
                </Link>
              </span>
            ))}
          </p>
        </li>
      );
    });
  }

  renderArtists() {
    const { artists } = this.props;
    return artists.items.map(artist => {
      const imageUrl =
        artist.images.length === 0
          ? 'https://picsum.photos/200/'
          : artist.images[artist.images.length - 1].url;
      return (
        <li className={styles.itemSearch} key={artist.id}>
          <Link to={`/artists/${artist.id}`}>
            <img className={styles.searchImg} src={imageUrl} alt="avatar/64/64" />
          </Link>
          <Link className={cx(styles.link, styles.text)} to={`/artists/${artist.id}`}>
            <p>{artist.name}</p>
          </Link>
        </li>
      );
    });
  }

  renderAlbums() {
    const { albums } = this.props;
    return albums.items.map(album => {
      return (
        <li className={styles.itemSearch} key={album.id}>
          <Link to={`/albums/${album.id}`}>
            <img className={styles.searchImg} src={album.images[2].url} alt="albumImage/64/64" />
          </Link>
          <Link className={cx(styles.link, styles.text)} to={`/albums/${album.id}`}>
            <p>{album.name}</p>
          </Link>
          <p>
            {album.artists.map(artist => (
              <span key={artist.id}>
                <Link
                  className={cx(styles.link, styles.text, styles.text_name)}
                  to={`/artists/${artist.id}`}
                >
                  {artist.name}
                </Link>
              </span>
            ))}
          </p>
        </li>
      );
    });
  }

  renderPlaylists() {
    const { playlists } = this.props;
    return playlists.items.map(playlist => {
      return (
        <li className={styles.itemSearch} key={playlist.id}>
          <img className={styles.searchImg} src={playlist.images[0].url} alt="albumImage/64/64" />
          <p>{playlist.name}</p>
        </li>
      );
    });
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Songs</h1>
        <hr />
        <ul className={styles.itemsSearch}>{this.renderSongs()}</ul>
        <h1 className={cx(styles.title, styles.title_second)}>Artists</h1>
        <hr />
        <ul className={styles.itemsSearch}>{this.renderArtists()}</ul>
        <h1 className={cx(styles.title, styles.title_second)}>Albums</h1>
        <hr />
        <ul className={styles.itemsSearch}>{this.renderAlbums()}</ul>
        <h1 className={cx(styles.title, styles.title_second)}>Playlists</h1>
        <hr />
        <ul className={styles.itemsSearch}>{this.renderPlaylists()}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    albums: albums(state),
    artists: artists(state),
    playlists: playlists(state),
    tracks: tracks(state),
  };
};

export default connect(mapStateToProps)(ResultSearching);
