import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import Button from './../../../components/forms/Buttons'
import { useDispatch } from 'react-redux'
import { addProduct } from './../../../redux/Cart/cart.actions';

const Product = (product) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {
        documentID,
        productThumbnail,
        productName,
        productPrice
    } = product;
    if ( !documentID || !productThumbnail || !productName || 
        typeof productPrice === 'undefined') return null;

        const configAddToCart = {
            type: 'button'
        }

        const handleAddToCart = (product) => {
            if (!product) return;
            dispatch(
                addProduct(product)
            );
            history.push('/cart');
        };

    return (
        <div className="product">
            <div className="thumb">
                <Link to={`/product/${documentID}`}>
                <img src={productThumbnail} alt={productName} />
                </Link>
            </div>
            
            <div className="details">
                <ul>
                    <li>
                        <span className="prodName">
                            <Link to={`/product/${documentID}`}>
                                {productName}
                            </Link>
                        </span>
                    </li>
                    <li>
                        <span className="prodPrice">
                            N{productPrice}
                        </span>
                    </li>
                    <li>
                        <div className="addToCart">
                            <Button {...configAddToCart} onClick={()=> handleAddToCart(product)}>
                                Add to cart
                            </Button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Product