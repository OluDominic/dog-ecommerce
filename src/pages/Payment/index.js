import React from 'react';
import PaymentDetails from './../../components/PaymentDetails'

import { usePaystackPayment } from 'react-paystack'
import { publickey } from './../../paystack/config';

const Payment = () => {

   // const stripePromise = loadStripe(publishableKey);
    return (
            <PaymentDetails />
    );
}

export default Payment;