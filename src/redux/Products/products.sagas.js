import { auth } from './../../firebase/utility';
import { takeLatest, put, all, call } from 'redux-saga/effects';
import { handleAddProduct, handleFetchProducts, handleDeleteProduct } from './products.helper';
import productsTypes from './products.types'
import { setProducts, fetchProductsStart } from './products.actions';

export function* addProduct({ payload: {
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

export function* fetchProducts() {
    try {
        const products = yield handleFetchProducts();
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

export default function* productSagas() {
    yield all([
        call(onAddproductStart),
        call(onFetchProductsStart),
        call(onDeleteProductsStart),
    ])
}