import React, { useState } from 'react';
import './index.scss'
import Button from './../forms/Buttons'
import { signInWithGoogle, auth } from './../../firebase/utility';
import FormInput from './../forms/FormInput';
import AuthWrapper from './../AuthWrapper';
import Buttons from './../forms/Buttons/index';
import { Link, withRouter } from 'react-router-dom';



const SignIn = props => {
    const [email, setEmail ] = useState('');
    const [password, setPassword ] = useState('')

    const initialState =()=> {
        setEmail('');
            setPassword('');
    };
    const handleSubmit= async e => {
        e.preventDefault();

        try {
            await auth.signInWithEmailAndPassword(email, password)
            initialState();
            props.history.push('/');
        } catch (err) {

        }
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
                                    <Button onClick={signInWithGoogle}>
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