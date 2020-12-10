import React from 'react'
import { Link } from 'react-router-dom'
import Button from './../../../components/forms/Buttons'

const Product = ({
    documentID,
    productThumbnail,
    productName,
    productPrice
}) => {
    if ( !documentID || !productThumbnail || !productName || 
        typeof productPrice === 'undefined') return null;

        const configAddToCart = {
            type: 'button'
        }
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
                            <Button {...configAddToCart}>
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