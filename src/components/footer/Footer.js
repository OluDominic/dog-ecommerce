import React from 'react';
import './footer.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-solid-svg-icons'
//import './Footer.css'

const Footer =()=> {
    return (
        <footer className="footer">
            <div className="wrap">
                <div className="row">
                    <div>
                        <h5 className="con">Contact Us</h5>
                        <p>You can contact us on 234-5062-232-22</p>
                    </div>
                </div>
            <div className="footer-copyright">
    <span> <FontAwesomeIcon icon={faCopyright} size="1x"/> </span> &nbsp; 2020
                </div>
            </div>
        </footer>
    );
}

export default Footer;