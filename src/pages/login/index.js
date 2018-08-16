import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontIcon } from 'react-md';
import { getUserProfile } from '../../sagas/userProfileSaga';
import { getUserPlaylists } from '../../sagas/userPlaylistsSaga';
import styles from '../login/Login.css';
import { client } from '../../api';

class LoginForm extends Component {
  componentDidMount() {
    const params = this.getHashParams();
    const accessToken = params.access_token;
    const refreshToken = params.refresh_token;

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      client.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
      this.props.getUserProfile();
      this.props.getUserPlaylists();
    }
  }

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  render() {
    return (
      <div className={styles.login}>
        <FontIcon className={styles.iconPerson}>person</FontIcon>
        <a className={styles.link} href="http://localhost:8888">
          login
        </a>
      </div>
    );
  }
}

export default connect(
  null,
  { getUserProfile, getUserPlaylists }
)(LoginForm);
