import React, {useState} from 'react';
import { useDispatch } from 'react-redux'
import { addProductStart } from './../../redux/Products/products.actions'
import Modal from './../../components/Modal';
import FormSelect from './../../components/forms/FormSelect/formSelect'
import FormInput from './../../components/forms/FormInput/index'
import Button from './../../components/forms/Buttons'
import './admin.scss';

const Admin = props=> {
    const dispatch = useDispatch();
    const [hideModal, setHideModal] = useState(true);
    const [productCategory, setProductCategory] = useState('')
    const [productName, setProductName] = useState('');
    const [productThumbnail, setProductThumbnail] = useState('');
    const [productPrice, setProductPrice] = useState(0);

    const toggleModal =()=> setHideModal(!hideModal);

    const configModal = {
        hideModal,
        toggleModal
    };

    const handleSubmit=e=> {
        e.preventDefault();

        dispatch(
            addProductStart({
                productCategory,
                productName,
                productThumbnail,
                productPrice
            })
        );
    }
    return (
        <div className="admin">
            
            <div className="newP">
                <ul>
                    <li>
                        <Button onClick={()=> toggleModal()}>
                            Add new product
                        </Button>
                    </li>
                </ul>
            </div>

            <Modal {...configModal}>
                <div>
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
        </div>
    );
}

export default Admin;