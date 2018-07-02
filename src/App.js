import React, { Component } from 'react';
import Menu from '../src/components/menu/Menu';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Menu />
        {this.props.children}
      </div>
    );
  }
}
export default App;
