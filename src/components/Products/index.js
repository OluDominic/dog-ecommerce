import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams} from 'react-router-dom'
import { fetchProductsStart } from './../../redux/Products/products.actions';
import FormSelect from './../forms/FormSelect/formSelect'
import Product from './ProductsRef'
import LoadMore from './../LoadMore/LoadMore'
import './products.scss';

const mapState = ({ productsData }) => ({
    products: productsData.products
});

const SearchProduct = ({ }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { filterType } = useParams();
    const { products } = useSelector(mapState)

    const { data, queryDoc, isLastPage } = products;

    useEffect(()=> {
        dispatch(
            fetchProductsStart({ filterType })
        )
    }, [ filterType ]);

    const handleFilter =(e)=> {
        const nextFilter = e.target.value;
        history.push(`/search/${nextFilter}`);
    };

    if (!Array.isArray(data)) return null;

    if (data.length < 1) {
        return (
            <div className="products">
                <p>
                    No search results.
                </p>
            </div>
        );
    }

    const configFilters = {
        defaultValue: filterType,
        options: [{
            name: 'Show all',
            value: ''
        }, {
            name: 'Foreign',
            value: 'foreign'
        }, {
            name: 'Local',
            value: 'local'
        }],
        handleChange: handleFilter
    };

    const handleLoadMore = () => {
        dispatch(
            fetchProductsStart({ 
                filterType,
                startAfterDoc: queryDoc,
                persistProducts: data
            })
        );
    }

    const configLoadMore = {
        onLoadMore: handleLoadMore
    }

    return (
        <div className="products">
            <h1>
                Browse Products
            </h1>

            <FormSelect {...configFilters} />
            <div className="productResults">
                {data.map((product, pos) => {
                    const { productThumbnail, productName, productPrice} = product;
                    if (!productThumbnail || !productName || 
                        typeof productPrice === 'undefined') return null;

                        const configProduct = {
                            ...product
                        }
                    return(
                        <Product {...configProduct} />
                    );
                })}
            </div>

            {!isLastPage && (
            <LoadMore {...configLoadMore} />
            )}
        </div>
    );
};

export default SearchProduct;