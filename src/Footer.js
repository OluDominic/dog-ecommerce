import React from 'react';
import './Footer.css'

const Footer =()=> {
    return (
        <footer>
            <div>
                <div className="row">
                    <div>
                        <h5>Contact</h5>
                        <p>You can contact us on 234-5062-232-22</p>
                    </div>
                    <div>
                        <h5>Return Policy</h5>
                        <p>We accept returns after 2 days max</p>
                    </div>
                </div>
            </div>
            <div className="footer-copyright">
                2019 Copyright: 
                <span> Shoppr</span>
            </div>
        </footer>
    );
}

export default Footer;