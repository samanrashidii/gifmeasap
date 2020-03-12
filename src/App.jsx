import React, { Component } from 'react';
import axios from 'axios';
import logo from './images/logo.svg';
import SearchBox from './components/SearchBox';
import Item from './components/Item';

class App extends Component {
  state = {
    value: null,
    name: 'React Gif Me...',
    images: [],
    pagination: 0,
    count: 20,
    loading: false
  }

  doSearch = (event) => {
    if (event) {
      this.setState({
        loading: true,
        value: event
      })
      axios({
        method: 'get',
        url: 'https://api.giphy.com/v1/gifs/search',
        params: {
          api_key: '1D2tEe96Y368U74dVgnUqdTD07hUGw0d',
          q: event,
          limit: this.state.count,
          offset: this.state.pagination,
          rating: 'G',
          lang: 'en'
        }
      })
      .then(res => {
        const images = this.state.images
        var newImages = images.concat(res.data.data)
        this.setState({
          images: newImages,
          loading: false,
          pagination: this.state.pagination + this.state.count
        })
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
            <div className="row justify-content-center">
              <div className="col-4-sm col-12-xs">
                <SearchBox
                  loading={this.state.loading}
                  searchItem={this.doSearch}
                />
              </div>
            </div>
            <div className="d-flex flex-wrap justify-content-center">
              {this.state.images.map((el, index) => <Item imageUrl={el.images.original.url} thumb={el.images.preview_webp.url} title={el.title} key={index} />)}
              {this.state.images.length === 0 && <p className="mt-4">There is nothing to show right now!</p>}
            </div>
            {this.state.images.length > 0 && <button
              className="btn btn-info mt-4"
              onClick={() => this.doSearch(this.state.value)}
            >
              Show more...
            </button>}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
