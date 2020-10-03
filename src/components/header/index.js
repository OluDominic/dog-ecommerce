import React from 'react';
import Logo from './../../log/doggypup.png'
import { useSelector, useDispatch } from 'react-redux';
import { signOutUserStart } from './../../redux/User/user.actions';
import { Link } from 'react-router-dom';
import './styles.scss'


const mapState = ({ user }) => ({
    currentUser: user.currentUser
})

const Header=(props)=> {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(mapState);

    const signOut=()=> {
        dispatch(signOutUserStart());
    }
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
                                <span onClick={()=> signOut()}>
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