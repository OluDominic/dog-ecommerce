import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducers from './User/user.reducer';
import productsReducer from './Products/products.reducer'
import cartReducer from './Cart/cart.reducer'
import ordersReducer from './Order/orders.reducers'

export const rootReducer = combineReducers({
    user: userReducers,
    productsData: productsReducer,
    cartData: cartReducer,
    ordersData: ordersReducer,
})

const configStorage = {
    key: 'root',
    storage,
    whitelist: ['cartData']
};

export default persistReducer(configStorage, rootReducer );