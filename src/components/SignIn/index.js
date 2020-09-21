import React from 'react';
import './index.scss'
import Button from './../../components/forms/Buttons/index'
import { signInWithGoogle } from './../../firebase/utility'


class SignIn extends React.Component {

    handleSubmit= async e => {
        e.preventDefault();
    }

    render() {
        return (
            <div className="signin">
                <div className="wrap">
                    <h2>
                        Login
                    </h2>
    
                    <div>
                        <form onSubmit={this.handleSubmit}>
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