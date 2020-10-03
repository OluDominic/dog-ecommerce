import React, { useState, useEffect  } from 'react';
import './index.scss'
import Button from './../forms/Buttons'
import FormInput from './../forms/FormInput';
import AuthWrapper from './../AuthWrapper';
import { useDispatch, useSelector } from 'react-redux'
import { emailSignInStart, googleSignInStart } from './../../redux/User/user.actions'
import Buttons from './../forms/Buttons/index';
import { Link, useHistory } from 'react-router-dom';


const mapState = ({ user }) => ({
    currentUser: user.currentUser
})

const SignIn = props => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { currentUser } = useSelector(mapState)
    const [email, setEmail ] = useState('');
    const [password, setPassword ] = useState('')

    useEffect(() => {
        if (currentUser) {
            initialState();
        history.push('/');
        }
    }, [currentUser]);

    const initialState =()=> {
        setEmail('');
            setPassword('');
    };
    const handleSubmit= e => {
        e.preventDefault();
        dispatch(emailSignInStart({email, password}));
    }

    const handleGoogleSign = () => {
        dispatch(googleSignInStart());
    }

        const configAuthWrapper = {
            headline: 'Login'
        };
        return (
            <AuthWrapper {...configAuthWrapper}>
                    <div>
                        <form onSubmit={handleSubmit}>

                            <FormInput 
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            handleChange= {e => setEmail(e.target.value)}
                            />

                            <FormInput 
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            handleChange= {e => setPassword(e.target.value)}
                            />

                            <Buttons type="submit">
                                Login
                            </Buttons>

                            <div className="googlesignin">
                                <div>
                                    <Button onClick={handleGoogleSign}>
                                        Sign in with google
                                    </Button>
                                </div>
                            </div>

                            <div className="links">
                                <Link to="/recovery">
                                    Forgot Password?
                                </Link>
                            </div>
                        </form>
                    </div>
            </AuthWrapper>
        );
    
    }
    
export default SignIn;