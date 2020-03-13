import React, { Component } from 'react';
import axios from 'axios';
import logo from './images/logo.svg';
import SearchBox from './components/SearchBox';
import Item from './components/Item';

class App extends Component {
  state = {
    value: null,
    name: 'React Gif Me...',
    giphy: {
      images: [],
      pagination: 0,
      count: 15,
    },
    tenor: {
      images: [],
      pagination: 0,
      count: 15,
    },
    loading: false
  }

  doSearch = (event) => {
    if (event) {
      if (event !== this.state.value) {
        this.setState({
          giphy: {
            images: [],
            pagination: 0,
            count: 15,
          },
          tenor: {
            images: [],
            pagination: 0,
            count: 15,
          },
        })
      }
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
          limit: this.state.giphy.count,
          offset: this.state.giphy.pagination,
          rating: 'G',
          lang: 'en'
        }
      })
      .then(res => {
        const giphyImages = this.state.giphy.images
        var gihpyNewImages = giphyImages.concat(res.data.data)

        axios({
          method: 'get',
          url: 'https://api.tenor.com/v1/search',
          params: {
            q: event,
            key: '3NAXFI8GNW3G',
            limit: this.state.tenor.count,
            pos: this.state.tenor.pagination,
            media_filter: 'basic'
          }
        })
        .then(result => {
          const tenorImages = this.state.tenor.images
          var tenorNewImages = tenorImages.concat(result.data.results)
          this.setState({
            loading: false,
            giphy: {
              images: gihpyNewImages,
              count: this.state.giphy.count,
              pagination: this.state.giphy.pagination + this.state.giphy.count
            },
            tenor: {
              images: tenorNewImages,
              count: this.state.tenor.count,
              pagination: this.state.tenor.pagination + this.state.tenor.count
            }
          })
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
            <p>
              Search Gifs through <span className="badge badge-primary">Giphy</span> and <span className="badge badge-primary">Tenor</span> faster and in one place
              <a href="https://github.com/samanrashidii/gifme-react" target="_blank" className="ml-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" height="30" alt="Github Icon" />
              </a>
            </p>
            <div className="row justify-content-center">
              <div className="col-4-sm col-12-xs">
                <SearchBox
                  loading={this.state.loading}
                  searchItem={this.doSearch}
                />
              </div>
            </div>
            <div className="d-flex flex-wrap justify-content-center">
              {this.state.giphy.images.map((el, index) => <Item imageUrl={el.images.original.url} thumb={el.images.preview_webp.url} title={el.title} key={index} />)}
              {this.state.tenor.images.map((el, index) => <Item imageUrl={el.url} thumb={el.media[0].nanogif.url} title={el.title} key={index} />)}
              {(this.state.giphy.images.length === 0 && this.state.tenor.images.length === 0) && <p className="mt-4">There is nothing to show right now!</p>}
            </div>
            {(this.state.giphy.images.length > 0 || this.state.tenor.images.length > 0) && <button
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
