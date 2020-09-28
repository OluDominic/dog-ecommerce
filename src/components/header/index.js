import React from 'react';
import Logo from './../../log/doggypup.png'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { auth } from './../../firebase/utility'
import './styles.scss'


const mapState = ({ user }) => ({
    currentUser: user.currentUser
})

const Header=(props)=> {
    const { currentUser } = useSelector(mapState);

    return (
        <header className="header">
           <div className="logo-wrap">
                <div className="logo-main">
                    <Link to="/">
                    <img src={Logo} alt="Logo" />
                    </Link>
                </div>

                <div className="headerLink">

                    {currentUser && (
                        <ul>
                            <li>
                            <Link to="/dashboard">
                            My Account
                            </Link>
                        </li>
                            <li>
                                <span onClick={()=> auth.signOut()}>
                                    LogOut
                                </span>
                            </li>
                        </ul>
                    )}

                    {!currentUser && (
                        <ul>
                        <li>
                            <Link to="/signup">
                            Sign Up
                            </Link>
                        </li>
                        <li>
                            <Link to="/login">
                            Login
                            </Link>
                        </li>
                    </ul>
                    )}
                    
                </div>
            </div>
        </header>
    );
}

Header.defaultProps = {
    currentUser: null
};

export default Header;