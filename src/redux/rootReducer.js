import { combineReducers } from 'redux';
import userReducers from './User/user.reducer';
import productsReducer from './Products/products.reducer'


export default combineReducers({
    user: userReducers,
    productsData: productsReducer
})