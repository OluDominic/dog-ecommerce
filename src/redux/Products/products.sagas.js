import { auth } from './../../firebase/utility';
import { takeLatest, put, all, call } from 'redux-saga/effects';
import { handleAddProduct } from './products.helper';
import productsTypes from './products.types'

export function* addProduct({ payLoad: {
    productCategory,
    productName,
    productThumbnail,
    productPrice
}}) {

    try {
        const timestamp = new Date();
        yield handleAddProduct({
            productCategory,
            productName,
            productThumbnail,
            productPrice,
            productAdminUserID: auth.currentUser.uid,
            createdDate: timestamp
        })
    } catch (err) {
        // console.log(err);
    }

}

export function* onAddproductStart() {
    yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct)
}

export default function* productSagas() {
    yield all([
        call(onAddproductStart)
    ])
}