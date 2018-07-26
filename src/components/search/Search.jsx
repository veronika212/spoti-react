import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Search.css';

import { search } from '../../sagas/searchSaga';

class Search extends Component {
  state = {
    query: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const { query } = this.state;
    this.props.search(query);
    this.setState({ query: '' });
  };

  onInputChange = event => {
    const { value } = event.target;
    this.setState({ query: value });
  };

  render() {
    const { query } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search"
            value={query}
            onChange={event => this.onInputChange(event)}
          />
        </div>
      </form>
    );
  }
}

export default connect(
  null,
  { search }
)(Search);
