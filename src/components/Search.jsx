import React, { Component } from 'react';

class SearchBox extends Component {
    state = {
        value: null
    }
    handleChange = (event) => {
        this.setState({value: event.target.value});
    }
    keyPress = (e) => {
        if(e.keyCode === 13){
           this.props.searchItem(this.state.value)
        }
    }
    render() { 
        const isLoading = this.props.loading;
        let button;

        if (isLoading) {
            button = <div className="spinner-border text-light" role="status">
                        <span className="sr-only">Loading...</span>
                     </div>
        } else {
            button = <span>Search</span>;
        }

        return (
            <div>
                <div className="input-group my-3">
                    <input 
                        type="text"
                        id="searchInput"
                        className="form-control"
                        placeholder="name of Gif"
                        onChange={this.handleChange}
                        onKeyDown={this.keyPress}
                        autoFocus
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-info"
                            type="button"
                            onClick={() => this.props.searchItem(this.state.value)}
                        >
                            {button}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default SearchBox;