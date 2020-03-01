import React from 'react';

const Item = (props) => {
    return (  
        <div className="card col-xs-6 col-sm-4 col-lg-3">
            <a href={props.imageUrl} target="_blank" rel="noopener noreferrer">
                <img src={props.thumb} className="card-img-top" alt="Gif Me..." />
            </a>
            <div className="card-body">
                <p className="card-text">{props.title}</p>
            </div>
        </div>
    );
}
 
export default Item;