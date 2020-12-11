import { combineReducers } from 'redux';
import userReducers from './User/user.reducer';
import productsReducer from './Products/products.reducer'
import cartReducer from './Cart/cart.reducer'


export default combineReducers({
    user: userReducers,
    productsData: productsReducer,
    cartData: cartReducer
})