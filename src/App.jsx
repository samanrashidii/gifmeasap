import React, { Component } from 'react';
import logo from './images/logo.svg';
import SearchBox from './components/SearchBox';

class App extends Component {
  state = {
    value: null,
    name: 'Gif Me...'
  }
  render () {
    return (
      <div className="App">
        <div className="app-container">
          <div className="app-inner-container">
            <img src={logo} className="app-logo" alt="logo" />
            <h1>{this.state.name}</h1>
            <SearchBox />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
