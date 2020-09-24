import React from 'react';
import './index.scss'
import Button from './../../components/forms/Buttons/index'
import { signInWithGoogle, auth } from './../../firebase/utility'
import FormInput from './../forms/FormInput';
import Buttons from './../forms/Buttons';


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
        return (
            <div className="signin">
                <div className="wrap">
                    <h2>
                        Login
                    </h2>
    
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
                        </form>
                    </div>
                </div>
            </div>
        );
    }
    
    }
    
export default SignIn;