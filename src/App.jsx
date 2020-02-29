import React, { Component } from 'react';
import axios from 'axios';
import logo from './images/logo.svg';
import SearchBox from './components/SearchBox';

class App extends Component {
  state = {
    value: null,
    name: 'Gif Me...'
  }

  doSearch = (event) => {
    if (event) {
      axios.get(`https://api.giphy.com/v1/gifs/search?api_key=1D2tEe96Y368U74dVgnUqdTD07hUGw0d&q=saman&limit=25&offset=0&rating=G&lang=en`)
      .then(res => {
        console.log(res.data)
      })
    }
  }
  render () {
    return (
      <div className="App">
        <div className="app-container">
          <div className="app-inner-container">
            <img src={logo} className="app-logo" alt="logo" />
            <h1>{this.state.name}</h1>
            <SearchBox
              searchItem={this.doSearch}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
