import React, { useState, useEffect } from 'react';
import FormInput from './../forms/FormInput'
//import { PaystackButton} from 'react-paystack'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Button from './../forms/Buttons'
import { CountryDropdown } from 'react-country-region-selector'
import { apiInstance } from './../../Utility/utility'
import { selectCartTotal, selectCartItemsCount, selectCartItems } from './../../redux/Cart/cart.selectors'
import { createStructuredSelector } from 'reselect'
import { useSelector, useDispatch } from 'react-redux';
import { saveOrderHistory } from './../../redux/Order/orders.actions'
import { clearCart } from './../../redux/Cart/cart.actions';
import { useHistory } from 'react-router-dom'
import './index.scss'

const initialAddressState = {
    line1: '',
    line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: ''
}

const mapState = createStructuredSelector({
    total: selectCartTotal,
    itemCount: selectCartItemsCount,
    cartItems: selectCartItems
});

const PaymentDetails = () => {
    const stripe = useStripe();
    const history = useHistory();
    const elements = useElements();
    const dispatch = useDispatch();
    const { total, itemCount, cartItems } = useSelector(mapState);
    const [billingAddress, setBillingAddress] = useState({...initialAddressState});
    const [shippingAddress, setShippingAddress] = useState({...initialAddressState});
    const [recipientName, setRecipientName] = useState('');
    const [nameOnCard, setNameOnCard] = useState('');

    useEffect(() => {
        if (itemCount < 1) {
            history.push('/dashboard');
        }
    }, [itemCount])

    const handleShipping = evt => {
        const { name, value } = evt.target;
        setShippingAddress({
            ...shippingAddress,
            [name]: value
        });
    }

    const handleBilling = evt => {
        const { name, value } = evt.target;
        setBillingAddress({
            ...billingAddress,
            [name]: value
        })
    }

    const configCardElement = {
        iconStyle: 'solid',
        style: {
            base: {
                fontSize: '16px'
            }
        },
        hidePostalCode: true
    }

    const handleFormSubmit = async event => {
        event.preventDefault();
        const cardElement = elements.getElement('card')

        if (
            !shippingAddress.line1 || !shippingAddress.city ||
            !shippingAddress.state || !shippingAddress.postal_code || 
            !shippingAddress.country || !billingAddress.line1 || 
            !billingAddress.city || !billingAddress.state || 
            !billingAddress.postal_code || !billingAddress.country ||
            !recipientName || !nameOnCard
        ) {
            return;
        }

        apiInstance.post('/payments/create', {
            amount: total ,
            shipping: {
                name: recipientName,
                address: {
                    ...shippingAddress
                }
            }
        }).then(({ data: clientSecret}) => {
            
            stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: {
                    name: nameOnCard,
                    address: {
                        ...billingAddress
                    }
                }
            }).then(({ paymentMethod }) => {

                stripe.confirmCardPayment(clientSecret, {
                    payment_method: paymentMethod.id
                })
                .then(({ paymentIntent }) => {

                    const configOrder = {
                        orderTotal: total,
                        orderItems: cartItems.map(item => {
                            const { documentID, productThumbnail, 
                            productName, productPrice, quantity } = item;

                            return {
                                documentID,
                                productThumbnail,
                                productName,
                                productPrice,
                                quantity
                            };
                        })
                    }
                    dispatch(
                        saveOrderHistory(configOrder)
                    )
                    //console.log(paymentIntent)
                })

            }) 

        });

    }
    return (
        <div className="paymentDetails">
            <form onSubmit={handleFormSubmit}>

                <div className="group">
                    <h2>
                        Shipping Address
                    </h2>

                    <FormInput 
                        required
                        placeholder="Recipient Name"
                        name="recipientName"
                        handleChange={evt => setRecipientName(evt.target.value) }
                        value={recipientName}
                        type="text"
                    />

                    <FormInput
                        required 
                        placeholder="Line 1"
                        name="line1"
                        handleChange={evt => handleShipping(evt)}
                        value={shippingAddress.line1}
                        type="text"
                    />

                    <FormInput 
                        placeholder="Line 2"
                        name="line2"
                        handleChange={evt => handleShipping(evt)}
                        value={shippingAddress.line2}
                        type="text"
                    />

                    <FormInput
                        required 
                        placeholder="City"
                        name="city"
                        handleChange={evt => handleShipping(evt)}
                        value={shippingAddress.city}
                        type="text"
                    />      

                    <FormInput
                        required 
                        placeholder="State"
                        name="state"
                        handleChange={evt => handleShipping(evt)}
                        value={shippingAddress.state}
                        type="text"
                    />

                    <FormInput 
                        required
                        placeholder="Postal Code"
                        name="postal_code"
                        handleChange={evt => handleShipping(evt)}
                        value={shippingAddress.postal_code}
                        type="text"
                    />
                    <div className="form checkoutInput">
                        <CountryDropdown
                            required 
                            onChange={val => handleShipping({
                                target: {
                                    name: 'country',
                                    value: val
                                }
                            })}
                            value={shippingAddress.country}
                            valueType="short"
                        />
                    </div>

                </div>

                <div className="group">
                    <h2>
                        Billing Address
                    </h2>

                    <FormInput 
                        required
                        placeholder="Name on Card"
                        name="nameOnCard"
                        handleChange={evt => setNameOnCard(evt.target.value)}
                        value={nameOnCard}
                        type="text"
                    />

                    <FormInput 
                        required
                        placeholder="Line 1"
                        name="line1"
                        handleChange={evt => handleBilling(evt)}
                        value={billingAddress.line1}
                        type="text"
                    />

                    <FormInput 
                        placeholder="Line 2"
                        name="line2"
                        handleChange={evt => handleBilling(evt)}
                        value={billingAddress.line2}
                        type="text"
                    />

                    <FormInput
                        required 
                        placeholder="City"
                        name="city"
                        handleChange={evt => handleBilling(evt)}
                        value={billingAddress.city}
                        type="text"
                    />      

                    <FormInput 
                        required
                        placeholder="State"
                        name="state"
                        handleChange={evt => handleBilling(evt)}
                        value={billingAddress.state}
                        type="text"
                    />

                    <FormInput 
                        required
                        placeholder="Postal Code"
                        name="postal_code"
                        handleChange={evt => handleBilling(evt)}
                        value={billingAddress.postal_code}
                        type="text"
                    />

                    <div className="form checkoutInput">
                        <CountryDropdown 
                            required
                            onChange={val => handleBilling({
                                target: {
                                    name: 'country',
                                    value: val
                                }
                            })}
                            value={billingAddress.country}
                            valueType="short"
                        />
                    </div>

                </div>

                <div className="group">
                    <h2>
                        Card Details
                    </h2>
                </div>

                <CardElement 
                options={configCardElement}
                />

                <Button 
                    type="submit"
                > 
                    PAY NOW
                </Button>
            </form>

            
        </div>
    )
}

export default PaymentDetails