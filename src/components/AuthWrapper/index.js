import React from 'react';
import './index.scss';

const AuthWrap = ({ headline, children })=> {
    return (
        <div className="authwrapper">
            <div className="wrap">
                {headline && <h2>{headline}</h2>}

                <div className="children">
                    {children && children}
                </div>
            </div>
        </div>
    );
}

export default AuthWrap;