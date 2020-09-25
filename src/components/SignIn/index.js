import React from 'react';
import './index.scss'
import Button from './../forms/Buttons'
import { signInWithGoogle, auth } from './../../firebase/utility';
import FormInput from './../forms/FormInput';
import AuthWrapper from './../AuthWrapper';
import Buttons from './../forms/Buttons/index';
import { Link } from 'react-router-dom';


const initialState = {
    email: '',
    password: ''
};
class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        };
    }

    handleChange=(e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }
    handleSubmit= async e => {
        e.preventDefault();
        const { email, password } = this.state

        try {
            await auth.signInWithEmailAndPassword(email, password)
            this.setState({
                ...initialState
            })
        } catch (err) {

        }
    }

    render() {

        const {email, password } = this.state;
        const configAuthWrapper = {
            headline: 'Login'
        };
        return (
            <AuthWrapper {...configAuthWrapper}>
                    <div>
                        <form onSubmit={this.handleSubmit}>

                            <FormInput 
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            handleChange= {this.handleChange}
                            />

                            <FormInput 
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            handleChange= {this.handleChange}
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
    
    }
    
export default SignIn;