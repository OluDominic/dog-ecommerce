import React from 'react';
import { Query } from 'react-apollo';
import PRODUCTS_QUERY from './product-list/index';
import Product from './Product';
import Navbar from './Navbar';

class Products extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cartitems: []
        }
    }

    addItem = (item)=> {
        this.setState({
            cartitems: this.state.cartitems([item])
        })
    }

    render() {
        return (
            <Query query={PRODUCTS_QUERY}>
                {({ loading, error, data}) => {
                    if (loading) return <div>Fetching</div>
                    if (error) return <div>Error</div>

                    const items = data.productsList.items;
                    return(
                        <div>
                            <Navbar />
                            <div>
                                <div>
                                    {items.map(item => <Product 
                                    key={item.id} product={item}
                                    addItem={this.addItem} />)}
                                </div>
                            </div>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default Products;