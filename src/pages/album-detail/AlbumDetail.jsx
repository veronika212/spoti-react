import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import classNames from 'classnames/bind';
import { DataTable, FontIcon, TableHeader, TableBody, TableRow, TableColumn } from 'react-md';

import { getAlbumDetail } from '../../sagas/albumDetailSaga';
import {
  selectAlbumDetail,
  selectArtists,
  selectImages,
  selectTracks,
} from '../../reducers/albumDetailReducer';
import styles from './AlbumDetail.css';

let cx = classNames.bind(styles);

class AlbumDetail extends Component {
  componentDidMount() {
    console.log(this.props, 'props');
    const { id } = this.props.match.params;
    this.props.getAlbumDetail(id);
  }

  renderArtists() {
    const { artists } = this.props;
    return artists.map(artist => {
      return (
        <li key={artist.id}>
          <p className={styles.albumDetailText}>
            By{' '}
            <Link className={styles.albumDetailArtist} to={`/artists/${artist.id}`}>
              <span>{artist.name}</span>
            </Link>
          </p>
        </li>
      );
    });
  }

  renderAlbumDetailHeader() {
    const { albumDetail, images, tracks } = this.props;
    if (images.length === 0) {
      return null;
    }
    return (
      <div className={styles.albumDetail}>
        <img className={styles.albumDetailImage} src={images[1].url} alt="album/300/300" />
        <div>
          <h4 className={cx(styles.albumDetailText, styles.albumDetailText_infoSentence)}>
            Album from your library
          </h4>
          <h1 className={styles.albumDetailTitle}>{albumDetail.name}</h1>
          <ul className={styles.albumDetailText}>{this.renderArtists()}</ul>
          <p className={styles.albumDetailText}>
            {`${format(albumDetail.release_date, 'YYYY')}`} &bull; {`${tracks.total} songs`}
          </p>
        </div>
      </div>
    );
  }

  renderTracks() {
    const { tracks } = this.props;
    return (
      <DataTable plain>
        <TableHeader>
          <TableRow>
            <TableColumn>Number</TableColumn>
            <TableColumn>Title</TableColumn>
            <TableColumn>
              <FontIcon>query_builder</FontIcon>
            </TableColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tracks.items.map(track => (
            <TableRow key={track.id}>
              <TableColumn>{track.track_number}</TableColumn>
              <TableColumn>{track.name}</TableColumn>
              <TableColumn>{format(track.duration_ms, 'm:ss')}</TableColumn>
            </TableRow>
          ))}
        </TableBody>
      </DataTable>
    );
  }

  render() {
    return (
      <div>
        {this.renderAlbumDetailHeader()}
        {this.renderTracks()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    albumDetail: selectAlbumDetail(state),
    artists: selectArtists(state),
    images: selectImages(state),
    tracks: selectTracks(state),
  };
};

export default connect(
  mapStateToProps,
  { getAlbumDetail }
)(AlbumDetail);
