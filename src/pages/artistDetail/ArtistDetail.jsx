import React, { Component } from 'react';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import { DataTable, FontIcon, TableHeader, TableBody, TableRow, TableColumn } from 'react-md';
import classNames from 'classnames/bind';

import { getArtistDetail, getArtistDetailImage } from '../../sagas/artistDetailSaga';
import { selectArtistDetailTracks, selectArtistDetail } from '../../reducers/artistDetailReducer';

import styles from '../artistDetail/ArtistDetail.css';

let cx = classNames.bind(styles);

class ArtistDetail extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getArtistDetail(id);
    this.props.getArtistDetailImage(id);
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props.match.params;

    if (id !== prevProps.match.params.id) {
      this.props.getArtistDetail(id);
      this.props.getArtistDetailImage(id);
    }
  }
  // handleDeleteTrack = trackId => {
  //   const { id } = this.props.match.params;
  //   this.props.deletePlaylistTrack(trackId, id);
  // };

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
            <TableColumn>Name</TableColumn>
            <TableColumn>Album</TableColumn>
            <TableColumn>Popularity</TableColumn>
            <TableColumn>Time</TableColumn>
            <TableColumn>Delete</TableColumn>
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
              <TableColumn>
                <FontIcon
                // onClick={() => {
                //   this.handleDeleteTrack(artistDetail.id);
                // }}
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
        {this.renderArtistHeader()}
        {this.renderTopTracks()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    artistDetailTracks: selectArtistDetailTracks(state),
    artistDetail: selectArtistDetail(state),
  };
};

export default connect(
  mapStateToProps,
  { getArtistDetail, getArtistDetailImage }
)(ArtistDetail);
