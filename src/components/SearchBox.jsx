import React, { Component } from 'react';

const SearchBox = (props) => {
    console.log(props)
    return (
        <h1>{props.name}</h1>
    );
}
 
export default SearchBox;