import React, { Component } from 'react';

import Menu from '../src/components/menu/Menu';
import './App.css';

class App extends Component {
  render() {
    return (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Menu className="menu" />
        <div className="appContent" style={{ width: '100%' }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
export default App;
