import React, { useState, useEffect } from 'react'
import FormInput from '../forms/FormInput';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUserStart } from './../../redux/User/user.actions'
import {useHistory} from 'react-router-dom';
import Button from './../../components/forms/Buttons/index'
import AuthWrapper from './../AuthWrapper'
import './index.scss';

const mapState = ({ user }) => ({
    currentUser: user.currentUser,
    userErr: user.userErr
})
const Signup =(props)=> {
    const dispatch = useDispatch();
    const history = useHistory();
    const { currentUser, userErr } = useSelector(mapState);
    const [displayName, setDisplayname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([])

    useEffect(()=> {
        if (currentUser) {
            Change();
            history.push('/')  
        }
    }, [currentUser]);

    useEffect(()=> {
        if (Array.isArray(userErr) && userErr.length > 0) {
            setErrors(userErr);
        }    }, [userErr])

    const Change =()=> {
        setDisplayname('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors([]);
    }

    const handleFormSubmit = async event => {
        event.preventDefault();
        dispatch(signUpUserStart({
            displayName,
            email,
            password,
            confirmPassword
        }))
        
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

export default Signup;