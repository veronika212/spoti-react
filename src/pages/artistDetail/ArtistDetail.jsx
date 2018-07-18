import React, { Component } from 'react';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import { Link } from 'react-router-dom';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn } from 'react-md';
import classNames from 'classnames/bind';

import {
  getArtistDetailTracks,
  getArtistDetail,
  getArtistDetailAlbums,
} from '../../sagas/artistDetailSaga';
import {
  selectArtistDetailTracks,
  selectArtistDetail,
  selectArtistDetailAlbums,
  selectArtistDetailAlbumsItems,
} from '../../reducers/artistDetailReducer';

import styles from '../artistDetail/ArtistDetail.css';

let cx = classNames.bind(styles);

class ArtistDetail extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getArtistDetailTracks(id);
    this.props.getArtistDetail(id);
    this.props.getArtistDetailAlbums(id);
  }

  componentDidUpdate(prevProps) {
    const { getArtistDetailTracks, getArtistDetail, getArtistDetailAlbums, match } = this.props;
    const { id } = match.params;
    const prevId = prevProps.match.params.id;
    if (id !== prevId) {
      getArtistDetailTracks(id);
      getArtistDetail(id);
      getArtistDetailAlbums(id);
    }
  }

  renderArtistHeader() {
    const { artistDetail } = this.props;

    return artistDetail.images.length > 0 ? (
      <div className={styles.artistDetailHeader}>
        <img className={styles.image} src={artistDetail.images[1].url} alt="artistAvatar/320/320" />
        <div className={styles.info}>
          <p className={styles.name}>{artistDetail.name}</p>
          <p className={styles.text}>Followers: {artistDetail.followers.total}</p>
          <p className={styles.text}>Popularity: {artistDetail.popularity}</p>
        </div>
      </div>
    ) : null;
  }

  renderTopTracks() {
    const { artistDetailTracks } = this.props;
    return (
      <DataTable plain>
        <TableHeader>
          <TableRow>
            <TableColumn>Image</TableColumn>
            <TableColumn>Title</TableColumn>
            <TableColumn>Album</TableColumn>
            <TableColumn>Popularity</TableColumn>
            <TableColumn>Time</TableColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {artistDetailTracks.map(track => (
            <TableRow key={track.id}>
              <TableColumn>
                <img
                  className={styles.tableImage}
                  src={track.album.images[2].url}
                  alt="artistDetailImage"
                />
              </TableColumn>
              <TableColumn>{track.name}</TableColumn>
              <TableColumn>{track.album.name}</TableColumn>
              <TableColumn>{track.popularity}</TableColumn>
              <TableColumn>{format(track.duration_ms, 'm:ss')}</TableColumn>
            </TableRow>
          ))}
        </TableBody>
      </DataTable>
    );
  }

  renderArtistAlbums() {
    const { albumsItems } = this.props;
    return albumsItems.map(item => {
      return (
        <li key={item.id} className={styles.albumItem}>
          <Link to={`/albums/${item.id}`}>
            <img
              className={styles.albumItemImage}
              src={item.images[1].url}
              alt="albumImage/300/300"
            />
          </Link>
          <div>
            <p className={styles.albumItemText}>{format(item.release_date, 'DD.MM.YYYY')}</p>
            <p className={cx(styles.albumItemText, styles.albumItemText_title)}>{item.name}</p>
          </div>
        </li>
      );
    });
  }

  render() {
    const { albums } = this.props;
    return (
      <div>
        {this.renderArtistHeader()}
        <h1 className={styles.title}>Top tracks</h1>
        {this.renderTopTracks()}
        <h1 className={cx(styles.title, styles.title_albums)}>Albums</h1>
        <p className={styles.albumText}>{`all albums: ${albums.total}`}</p>
        <ul className={styles.albums}>{this.renderArtistAlbums()}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    artistDetail: selectArtistDetail(state),
    artistDetailTracks: selectArtistDetailTracks(state),
    albums: selectArtistDetailAlbums(state),
    albumsItems: selectArtistDetailAlbumsItems(state),
  };
};

export default connect(
  mapStateToProps,
  { getArtistDetailTracks, getArtistDetail, getArtistDetailAlbums }
)(ArtistDetail);
