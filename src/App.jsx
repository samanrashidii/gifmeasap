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
      count: 10,
    },
    tenor: {
      images: [],
      pagination: 0,
      count: 10,
    },
    loading: false
  }

  doSearch = (event) => {
    const defaultObj = {
      images: [],
      pagination: 0,
      count: 10
    }
    if (event) {
      if (event !== this.state.value) {
        this.setState({
          giphy: defaultObj,
          tenor: defaultObj
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
        this.setState({
          giphy: {
            images: gihpyNewImages,
            count: this.state.giphy.count,
            pagination: this.state.giphy.pagination + this.state.giphy.count
          }
        })
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
    const isLoading = this.props.loading;
    let button;
    if (isLoading) {
        button = <div className="spinner-border text-light" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
    } else {
        button = <span>Show more...</span>;
    }
    
    return (
      <div className="App">
        <div className="app-container p-2">
          <div className="app-inner-container">
            <img src={logo} className="app-logo" alt="logo" />
            <h1>{this.state.name}</h1>
            <p>
              Search Gifs from <span className="badge badge-primary">Giphy</span> and <span className="badge badge-primary">Tenor</span> faster, lighter and in one place
              <a href="https://github.com/samanrashidii/gifme-react" rel="noopener noreferrer" target="_blank" className="ml-2">
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
              {(this.state.giphy.images.length === 0 && this.state.tenor.images.length === 0 && this.state.value) && <p className="mt-4">There is nothing to show right now!</p>}
            </div>
            {(this.state.giphy.images.length > 0 || this.state.tenor.images.length > 0) && <button
              className="btn btn-info my-4"
              onClick={() => this.doSearch(this.state.value)}
            >
              {button}
            </button>}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
