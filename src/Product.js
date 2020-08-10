import React from 'react';

const Product =(props)=> {
    return (
        <div>
            <div>
                <div>
                    <h5 className="card-title">{props.product.name}</h5>
                    <h6 className="card-title">$ {props.product.price}</h6>
                    <button className="btn-primary" onClick={()=> 
                    props.addItem(props.product)}>
                        Buy now
                    </button>
                </div> 
            </div>
        </div>
    );
}

export default Product;