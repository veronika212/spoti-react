import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUserProfile } from '../../sagas/userProfileSaga';

class UserProfile extends Component {
  componentDidMount() {
    this.props.getUserProfile();
  }

  render() {
    return <div>User Profile</div>;
  }
}

export default connect(
  null,
  { getUserProfile }
)(UserProfile);
