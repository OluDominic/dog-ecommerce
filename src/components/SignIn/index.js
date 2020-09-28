import React, { useState, useEffect  } from 'react';
import './index.scss'
import Button from './../forms/Buttons'
import FormInput from './../forms/FormInput';
import AuthWrapper from './../AuthWrapper';
import { useDispatch, useSelector } from 'react-redux'
import { signInUser,signInWithGoogle, resetAllAuthForms } from './../../redux/User/user.actions'
import Buttons from './../forms/Buttons/index';
import { Link, withRouter } from 'react-router-dom';

const mapState = ({ user }) => ({
    signInSuccess: user.signInSuccess
})

const SignIn = props => {
    const { signInSuccess } = useSelector(mapState)
    const dispatch = useDispatch();
    const [email, setEmail ] = useState('');
    const [password, setPassword ] = useState('')

    useEffect(() => {
        if (signInSuccess) {
            initialState();
            dispatch(resetAllAuthForms());
        props.history.push('/');
        }
    }, [signInSuccess]);

    const initialState =()=> {
        setEmail('');
            setPassword('');
    };
    const handleSubmit= e => {
        e.preventDefault();
        dispatch(signInUser({email, password}));
    }

    const handleGoogleSign = () => {
        dispatch(signInWithGoogle());
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
    
export default withRouter(SignIn);