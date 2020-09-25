import React from 'react';
import { withRouter } from 'react-router-dom';
import './index.scss';
import FormInput from './../forms/FormInput'
import Button from './../forms/Buttons'
import AuthWrap from './../AuthWrapper';
import { auth } from './../../firebase/utility';

const initialState = {
    email: '',
    errors: []
}

class EmailPass extends React.Component {

    constructor (props) {
        super(props)
        this.state = {...initialState}

    }

    handleSubmit = async (e)=> {
        e.preventDefault();
        
        try {
            const { email } = this.state;

            const config = {
                url: 'http://localhost:3000/login'
            }
            
            await auth.sendPasswordResetEmail(email, config)
            .then(() => {
                this.props.history.push('./login');
            })
            .catch(() => {
                const err = ['Email not found. Please try again.'];
                this.setState({
                    errors: err
                })
            })
        } catch (err) {

        }
    }

    handleChange=(e)=> {
        const {name, value} = e.target;
        this.setState({
            [name] : value
        })
    }
    render() {

        const { email, errors } = this.state;

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
                    <form onSubmit={this.handleSubmit}>

                        <FormInput 
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        onChange={this.handleChange}
                        />

                        <Button type="submit">
                            Email Password
                        </Button> 

                    </form>

                </div>
            </AuthWrap>
        );
    }
}

export default withRouter(EmailPass);