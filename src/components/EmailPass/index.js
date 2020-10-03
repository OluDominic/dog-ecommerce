import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordStart, resetUserState } from './../../redux/User/user.actions';
import { useHistory } from 'react-router-dom';
import './index.scss';
import FormInput from './../forms/FormInput'
import Button from './../forms/Buttons'
import AuthWrap from './../AuthWrapper';

const mapState = ({ user }) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    userErr: user.userErr
});
const EmailPass = (props)=> {
    const dispatch = useDispatch();
    const history = useHistory();
    const { resetPasswordSuccess, userErr } = useSelector(mapState);
    const [email, setEmail] = useState('')
    const [errors, setErrors] =  useState([])

    useEffect(()=> {
        if (resetPasswordSuccess) {
            dispatch(resetUserState());
            history.push('/login');
        }
    }, [resetPasswordSuccess]);

    useEffect(()=> {
        if (Array.isArray(userErr) && userErr.length > 0) {
            setErrors(userErr);
        }

    }, [userErr])

    const handleSubmit = (e)=> {
        e.preventDefault();
        dispatch(resetPasswordStart({ email }));
        
    }

        const Config = {
            headline: 'Email Password'
        }
        return(
            <AuthWrap {...Config}>
                <div>
                    
                    {errors.length > 0 && (
                        <ul>
                            {errors.map((e, index)=> {
                                return (
                                    <li key={index}>
                                        {e}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                    <form onSubmit={handleSubmit}>

                        <FormInput 
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        handleChange={e => setEmail(e.target.value)}
                        />

                        <Button type="submit">
                            Email Password
                        </Button> 

                    </form>

                </div>
            </AuthWrap>
        );
}

export default EmailPass;