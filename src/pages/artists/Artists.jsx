import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getArtists } from '../../sagas/artistsSaga';
import { selectArtists } from '../../reducers/artistsReducer';
import styles from './Artists.css';

class Artists extends Component {
  componentDidMount() {
    this.props.getArtists();
  }

  renderArtists() {
    const { artists } = this.props;

    return artists.map(artist => {
      return (
        <li key={artist.id} className={styles.artistListItem}>
          <img className={styles.imageArtists} src={artist.images[2].url} alt="artistAvatar" />
          <span>{artist.name}</span>
          <span>{`popularity: ${artist.popularity}`}</span>
        </li>
      );
    });
  }

  render() {
    const { artists } = this.props;
    return artists.length > 0 ? (
      <ul className={styles.imageArtistsList}>{this.renderArtists()}</ul>
    ) : null;
  }
}

const mapStateToProps = state => {
  return {
    artists: selectArtists(state),
  };
};

export default connect(
  mapStateToProps,
  { getArtists }
)(Artists);
