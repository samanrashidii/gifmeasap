import React, { Component } from 'react';

class SearchBox extends Component {
    state = {
        value: null
    }
    handleChange = (event) => {
        this.setState({value: event.target.value});
    }
    render() { 
        return (
            <div>
                <div className="input-group my-3">
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="name of gif"
                        onChange={this.handleChange}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-success"
                            type="button"
                            onClick={() => this.props.searchItem(this.state.value)}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default SearchBox;