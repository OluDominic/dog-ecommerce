import { auth } from './../../firebase/utility';
import { takeLatest, put, all, call } from 'redux-saga/effects';
import { handleAddProduct, handleFetchProducts,
     handleDeleteProduct, handleFetchProduct } from './products.helper';
import productsTypes from './products.types'
import { setProducts, setProduct, fetchProductsStart } from './products.actions';

export function* addProduct({ payload }) {

    try {
        const timestamp = new Date();
        yield handleAddProduct({
            ...payload,
            productAdminUserUID: auth.currentUser.uid,
            createdDate: timestamp
        });
        yield put(
            fetchProductsStart()
        );
    } catch (err) {
        // console.log(err);
    }

}

export function* onAddproductStart() {
    yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct)
}

export function* fetchProducts({ payload }) {
    try {
        const products = yield handleFetchProducts(payload);
        yield put (
            setProducts(products)
        )
    } catch (err) {
        // console.log(err);
    }
}

export function* onFetchProductsStart() {
    yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts);
}

export function* deleteProduct({ payload }) {
    try {
        yield handleDeleteProduct(payload);
        yield put (
            fetchProductsStart()
        );
    } catch (err) {
        // console.log(err);
    }
}

export function* onDeleteProductsStart() {
    yield takeLatest(productsTypes.DELETE_PRODUCT_START, deleteProduct);
}

export function* fetchProduct({ payload }) {
    try {
        const product = yield handleFetchProduct(payload);
        yield put(
            setProduct(product)
        )
    } catch (err) {
        //console.log(err)
    }
}

export function* onFetchProductStart() {
    yield takeLatest(productsTypes.FETCH_PRODUCT_START, fetchProduct)
}

export default function* productSagas() {
    yield all([
        call(onAddproductStart),
        call(onFetchProductsStart),
        call(onDeleteProductsStart),
        call(onFetchProductStart),
    ])
}