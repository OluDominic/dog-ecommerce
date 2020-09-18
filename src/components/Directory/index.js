import React from 'react';
import Rott from './../../rottweiler.jpg'
import Pitt from './../../pitbull.jpg'
import  './index.scss'

const Directory =(props)=> {
    return (
        <div className="directory">
            <div className="wrap">
            <div
            className="item"
            style={{
                backgroundImage: `url(${Rott})`
            }}
            >
                <a>
                   Domestic
                </a>
            </div>
            <div
            className="item"
            style={{
                backgroundImage: `url(${Pitt})`
            }}
            >
                <a>
                    Wild
                </a>
            </div>
            </div>
        </div>
    );
}

export default Directory;