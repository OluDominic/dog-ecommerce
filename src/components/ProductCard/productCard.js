import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductStart, setProduct } from './../../redux/Products/products.actions'
import Button from './../forms/Buttons'
import './productCard.scss';

const mapState = state => ({
    product: state.productsData.product
})

const ProductCard = ({}) => {
    const dispatch = useDispatch();
    const { productID } = useParams();
    const {product} = useSelector(mapState)

    const {
        productThumbnail,
        productName,
        productPrice,
        productDescription
    } = product

    useEffect(() => {
        dispatch(
            fetchProductStart(productID)
        )

        return () => {
            dispatch(
                setProduct({})
            )
        }
    }, []);

    const configAddToCart = {
        type: 'button'
    }
    return (
        <div className="productCard">
            <div className="hero">
                <img src={productThumbnail } />
            </div>
            <div className="productDetails">
                <ul>
                    <li>
                        <h1>
                            {productName}
                        </h1>
                    </li>
                    <li>
                        <span>
                            N{productPrice}
                        </span>
                    </li>
                    <li>
                        <div className="addToCart">
                            <Button {...configAddToCart}>
                                Add to cart
                            </Button>
                        </div>
                    </li>
                    <li>
                        <span dangerouslySetInnerHTML={{ __html: productDescription}} />
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default ProductCard;