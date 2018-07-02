import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUserProfile } from '../../sagas/userProfileSaga';
import styles from './user-profile.css';

class UserProfile extends Component {
  componentDidMount() {
    this.props.getUserProfile();
  }

  render() {
    return (
      <div className={styles.userProfile}>
        <p>User Profile</p>
      </div>
    );
  }
}

export default connect(
  null,
  { getUserProfile }
)(UserProfile);
