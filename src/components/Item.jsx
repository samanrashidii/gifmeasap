import React from 'react';

const Item = (props) => {
    return (
        <div className="result-card col-6 col-sm-4 col-md-3 col-lg-2">
            <div className="card p-0">
                <img src={props.thumb} className="card-img-top" alt="Gif Me" />
                <div className="card-body">
                    <p className="card-text">{props.title}</p>
                    <a className="btn btn-success btn-sm" href={props.imageUrl} title="Click to open original size of image and download it" target="_blank" rel="noopener noreferrer">Open and Download</a>
                </div>
            </div>
        </div>
    );
}
 
export default Item;