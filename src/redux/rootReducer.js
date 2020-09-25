import { combineReducers } from 'redux';
import userReducers from './User/user.reducer';

export default combineReducers({
    user: userReducers
})