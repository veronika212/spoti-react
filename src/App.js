import React, { Component } from 'react';

import Menu from '../src/components/menu/Menu';
import Header from '../src/header/Header';
import './App.css';

class App extends Component {
  render() {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
        <Menu className="menu" />
        <div className="appContent" style={{ width: '80%', marginLeft: '20%' }}>
          <Header />
          <div style={{ marginTop: '4rem' }}>{this.props.children}</div>
        </div>
      </div>
    );
  }
}
export default App;
