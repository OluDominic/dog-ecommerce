import React from 'react'
import Button from './../../../components/forms/Buttons'

const Product = ({
    productThumbnail,
    productName,
    productPrice
}) => {
    if (!productThumbnail || !productName || 
        typeof productPrice === 'undefined') return null;

        const configAddToCart = {
            type: 'button'
        }
    return (
        <div className="product">
            <div className="thumb">
                <img src={productThumbnail} alt={productName} />
            </div>
            
            <div className="details">
                <ul>
                    <li>
                        <span className="prodName">
                            {productName}
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