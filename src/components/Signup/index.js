import React, { useState } from 'react'
import FormInput from '../forms/FormInput';
import {withRouter} from 'react-router-dom';
import Button from './../../components/forms/Buttons/index'
import { auth, handleUserProfile } from './../../firebase/utility'
import AuthWrapper from './../AuthWrapper'
import './index.scss';


const Signup =(props)=> {
    const [displayName, setDisplayname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([])

    const Change =()=> {
        setDisplayname('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors([]);
    }

    const handleFormSubmit = async event => {
        event.preventDefault();

        if(password !== confirmPassword) {
            const err = ['Password don\'t match'];
            setErrors(err);
            return;
        }

        try {
            
            const { user } = await auth.createUserWithEmailAndPassword(email, password);

            await handleUserProfile(user, { displayName });
            Change();
            props.history.push('/')
        } catch (err) {
            // console.log(err);
        }
    }

       
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
                    <form onSubmit={handleFormSubmit}>

                        <FormInput 
                        type="text"
                        name="displayName"
                        value={displayName}
                        placeholder="Full name"
                        handleChange={e=> setDisplayname(e.target.value)}
                        />

                        <FormInput 
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        handleChange={e=> setEmail(e.target.value)}
                        />

                        <FormInput 
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Enter password"
                        handleChange={e=> setPassword(e.target.value)}
                        />

                        <FormInput 
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        placeholder="Confirm password"
                        handleChange={e=> setConfirmPassword(e.target.value)}
                        />

                        <Button type="submit" >
                            Register
                        </Button>
                    </form>
                </div>

            </AuthWrapper>
        );
}

export default withRouter(Signup);