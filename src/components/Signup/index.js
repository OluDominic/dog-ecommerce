import React from 'react';
import FormInput from '../forms/FormInput';
import Button from './../../components/forms/Buttons/index'
import { auth, handleUserProfile } from './../../firebase/utility'
import AuthWrapper from './../AuthWrapper'
import './index.scss';

const initialState = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: []
};

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        };
    }

    handleChange= (e)=> {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
    }

    handleFormSubmit = async event => {
        event.preventDefault();
        const { displayName,
        email,
        password,
        confirmPassword,
        } = this.state;

        if(password !== confirmPassword) {
            const err = ['Password don\'t match'];
            this.setState({
                errors: err
            })
            return;
        }

        try {

            const { user } = await auth.createUserWithEmailAndPassword(email, password);

            await handleUserProfile(user, { displayName });

            this.setState({
                ...initialState
            });

        } catch (err) {
            // console.log(err);
        }
    }

    render(){
        const { displayName, email, password, confirmPassword, errors } = this.state;
        const configWrap = {
            headline: 'Register Here'
        }

        return (
            <AuthWrapper {...configWrap}>
                    
                <div className="wrap">
                        
                    {errors.length > 0 && (
                        <ul>
                            {errors.map((err, index)=> {
                                return (
                                    <li key={index}>
                                        {err}
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                    <form onSubmit={this.handleFormSubmit}>

                        <FormInput 
                        type="text"
                        name="displayName"
                        value={displayName}
                        placeholder="Full name"
                        onChange={this.handleChange}
                        />

                        <FormInput 
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        onChange={this.handleChange}
                        />

                        <FormInput 
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Enter password"
                        onChange={this.handleChange}
                        />

                        <FormInput 
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        placeholder="Confirm password"
                        onChange={this.handleChange}
                        />

                        <Button type="submit" >
                            Register
                        </Button>
                    </form>
                </div>
                
            </AuthWrapper>
        );
    }
}

export default Signup;