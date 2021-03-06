import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import { getArtists } from '../../sagas/artistsSaga';
import { selectArtists } from '../../reducers/artistsReducer';

import styles from './Artists.css';

let cx = classNames.bind(styles);

class Artists extends Component {
  componentDidMount() {
    this.props.getArtists();
  }

  renderArtists() {
    const { artists } = this.props;
    return artists.map(artist => {
      const imagesArrayLength = artist.images.length;
      const imageUrl =
        imagesArrayLength === 0
          ? 'https://picsum.photos/200'
          : artist.images[imagesArrayLength - 1].url;

      return (
        <li key={artist.id} className={styles.artistListItem}>
          <Link to={`/artists/${artist.id}`}>
            <img className={styles.imageArtists} src={imageUrl} alt="artistAvatar" />
          </Link>
          <Link to={`/artists/${artist.id}`} className={styles.link}>
            <span className={cx(styles.artistsText, styles.artistsName)}>{artist.name}</span>
          </Link>
          <span className={cx(styles.artistsText, styles.artistsPopularity)}>{`popularity: ${
            artist.popularity
          }`}</span>
        </li>
      );
    });
  }

  render() {
    const { artists } = this.props;
    return artists.length > 0 ? (
      <div>
        <h1 className={styles.title}>Artists</h1>
        <hr className={styles.line} />
        <ul className={styles.imageArtistsList}>{this.renderArtists()}</ul>
      </div>
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
