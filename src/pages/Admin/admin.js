import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addProductStart, fetchProductsStart, deleteProductStart } from './../../redux/Products/products.actions'
import Modal from './../../components/Modal';
import FormSelect from './../../components/forms/FormSelect/formSelect'
import FormInput from './../../components/forms/FormInput/index'
import Button from './../../components/forms/Buttons'
import Buttons from './../../components/forms/Buttons'
import './admin.scss';

const mapState = ({ productsData }) => ({
    products: productsData.products
})

const Admin = props=> {
    const { products } = useSelector(mapState);
    const dispatch = useDispatch();
    const [hideModal, setHideModal] = useState(true);
    const [productCategory, setProductCategory] = useState('foreign')
    const [productName, setProductName] = useState('');
    const [productThumbnail, setProductThumbnail] = useState('');
    const [productPrice, setProductPrice] = useState(0);

    useEffect(()=> {
        dispatch(
            fetchProductsStart()
        );
    }, []);

    const toggleModal =()=> setHideModal(!hideModal);

    const configModal = {
        hideModal,
        toggleModal
    };

    const resetForm =()=> {
        setHideModal(true);
        setProductCategory('foreign');
        setProductName('');
        setProductThumbnail('');
        setProductPrice(0);
    }

    const handleSubmit = e=> {
        e.preventDefault();

        dispatch(
            addProductStart({
                productCategory,
                productName,
                productThumbnail,
                productPrice
            })
        );
        resetForm();
    }
    return (
        <div className="admin">
            
            <div className="newP">
                <ul>
                    <li>
                        <Buttons onClick={()=> toggleModal()}>
                            Add new product
                        </Buttons>
                    </li>
                </ul>
            </div>

            <Modal {...configModal}>

                
                <div className="addNewProductForm">
                    <form onSubmit={handleSubmit}>
                        
                        <h2>
                            Add new product
                        </h2>

                        <FormSelect
                        label="Category"
                        options={[{
                            value: "foreign",
                            name: "Foreign"
                        }, {
                            value: "local",
                            name: "Local"
                        }
                    ]}
                    handleChange={e => setProductCategory(e.target.value)}
                    />

                    <FormInput 
                    label="Name"
                    type="text"
                    value={productName}
                    handleChange={e=> setProductName(e.target.value)}
                    />

                    <FormInput 
                    label="Main image URL"
                    type="url"
                    value={productThumbnail}
                    handleChange={e=> setProductThumbnail(e.target.value)}
                    />

                    <FormInput 
                    label="price"
                    type="number"
                    min="0.00"
                    max="1000000.00"
                    step="1000.00"
                    value={productPrice}
                    handleChange={e => setProductPrice(e.target.value)}
                    />

                    <Button type="submit">
                        Add product
                    </Button>

                    </form>
                </div>
            </Modal>
            
            <div className="manageProducts">
                    <table border="0" cellPadding="0" cellSpacing="0">
                        <tbody>
                            <tr>
                                <th>
                                    <h1>
                                        Manage Products
                                    </h1>
                                </th>
                            </tr>
                            <tr>
                                <td>
                                    <table className="results" border="0" cellPadding="10" cellSpacing="0">
                                        <tbody>
                                            {products.map((product, index) => {
                                                const {
                                                    productName,
                                                    productThumbnail,
                                                    productPrice,
                                                    documentID
                                                } = product;
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            <img className="thumb" src={productThumbnail}  />
                                                        </td>
                                                        <td>
                                                            {productName}
                                                        </td>
                                                        <td>
                                                            N{productPrice}
                                                        </td>
                                                        <td>
                                                            <Button onClick={()=> dispatch(deleteProductStart(documentID))}>
                                                                Delete
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
        </div>
    );
}

export default Admin;