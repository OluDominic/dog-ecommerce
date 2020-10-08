import React from 'react'
import { Link } from 'react-router-dom'
import Header from './../components/header/index'
import Footer from './../components/footer/Footer'
import { signOutUserStart } from './../redux/User/user.actions'
import VerticalNav from './../components/VertivalNav'
import { useDispatch } from 'react-redux'

const Admin = props=> {
    const dispatch = useDispatch();

    const signOut =()=> {
        dispatch(signOutUserStart());
    };

    return (
        <div className="adminLay">
            <Header {...props} />
            <div className="controlPanel">
                <div className="sidebar">
                    <VerticalNav>
                        <ul>
                            <li>
                                <Link to="/admin">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <span className="signout" onClick={()=> signOut()}>
                                    SignOut
                                </span>
                            </li>
                        </ul>
                    </VerticalNav>
                </div>
                <div className="content">
                    {props.children}
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Admin;