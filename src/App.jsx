import React, { Component } from 'react';
import logo from './images/logo.svg';
import SearchBox from './components/SearchBox';

class App extends Component {
  state = {
    value: null
  }
  render () {
    return (
      <div className="App">
        <div className="app-container">
          <div className="app-inner-container">
            <img src={logo} className="app-logo" alt="logo" />
            <SearchBox name="saman" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
