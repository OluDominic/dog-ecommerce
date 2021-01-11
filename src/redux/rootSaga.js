import { all, call } from 'redux-saga/effects';

import userSagas from './User/user.sagas'
import productSagas from './Products/products.sagas';
import ordersSagas from './Order/orders.sagas'


export default function* rootSaga() {
    yield all([
        call(userSagas),
        call(productSagas),
        call(ordersSagas)
    ])
}