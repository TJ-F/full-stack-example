// src/pages/SquarePayment.js
import React, { useState, useMemo } from 'react';
import SquarePaymentForm from '../components/SquarePaymentForm';
import VerificationDetailsForm from '../components/VerificationDetailsForm';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { convertTo24HourDateTime } from '../util/FormatTime';

// Square recommends using verification details, but it is optional
class VerificationDetails {
    constructor({
        amount,
        givenName,
        familyName,
        email,
        phone,
        addressLines,
        city,
        state,
        countryCode,
        currencyCode,
        intent,
        customerInitiated,
        sellerKeyedIn,
    }) {
        this.amount = amount;
        this.billingContact = {
            givenName,
            familyName,
            email,
            phone,
            addressLines,
            city,
            state,
            countryCode,
        };
        this.currencyCode = currencyCode;
        this.intent = intent;
        this.customerInitiated = customerInitiated;
        this.sellerKeyedIn = sellerKeyedIn;
    }
}

const SquarePayment = () => {
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem('token');

    //
    const { state } = useLocation();
    const navigate = useNavigate();

    const amount = state?.amount;
    const tee_time = state?.tee_time;
    const num_golfers = state?.num_golfers;
    const customer_id = user?.customer_id;
    const date = state?.date;

    // when the payment is successful
    const handleSuccess = (paymentData) => {
        // TODO - add guest checkout handling in the future

        // check and handle non-logged-in users

        if (!customer_id || !token) {
            alert("You must be logged in to book a tee time.");
            navigate('/login');
            return;
        }

        // Convert `date` (e.g., "2025-06-24T00:00:00.000Z") to "YYYY-MM-DD"
        const formattedDate = date ? new Date(date).toISOString().split('T')[0] : '';

        const formattedTime = tee_time ? convertTo24HourDateTime(tee_time) : '00:00:00';
        // MySQL DATETIME format
        const dateTimeString = `${formattedDate} ${formattedTime}`;

        // Proceed with booking
        axios.post(`${process.env.REACT_APP_API_URL}/api/square_payment`, {
            square_payment_id: paymentData?.payment?.id,
            customer_id: user?.customer_id,
            amount: paymentData?.payment?.amountMoney?.amount / 100,
            currency: 'USD',
            status: paymentData?.payment?.status,
            last4: paymentData?.payment?.cardDetails?.card?.last4,
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            }).then(() => {
                axios.post(`${process.env.REACT_APP_API_URL}/api/reserved-teetimes`,
                    {
                        customer_id,
                        num_golfers,
                        total_price: paymentData.payment.amountMoney.amount / 100,
                        paid: 1,
                        date_time: dateTimeString,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        withCredentials: true,
                    }
                ).then(() => {
                    navigate('/payment_success', {
                        state: {
                            paymentId: paymentData?.payment?.id,
                            amount: paymentData?.payment?.amountMoney?.amount / 100,
                            last4: paymentData?.payment?.cardDetails?.card?.last4,
                            time: tee_time,
                            num_golfers,
                        },
                    });
                }).catch((err) => {
                    console.error('Error booking tee time:', err);
                });
            });
    };

    const [formData, setFormData] = useState({
        givenName: '',
        familyName: '',
        email: '',
        phone: '',
        addressLines: '',
        city: '',
        state: '',
        countryCode: 'US', // default if applicable
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const billingDetails = useMemo(() => {
        return new VerificationDetails({
            ...formData,
            amount,
            currencyCode: 'USD',
            intent: 'CHARGE',
            customerInitiated: true,
            sellerKeyedIn: false,
        });
    }, [formData, amount]);

    return (
        <div
            style={{
                minHeight: '100vh',
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundImage: `url(${require('../images/golf_login.jpg')})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundAttachment: 'fixed',
            }}
        >
            <div
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    padding: '2rem',
                    borderRadius: '8px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                    width: 'clamp(300px, 90vw, 500px)',
                    maxWidth: 500,
                    margin: '0 auto',
                }}
            >
                <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    Complete Your Payment
                </h2>

                <h5 className="card-title mb-3">Billing Information</h5>
                <VerificationDetailsForm
                    formData={formData}
                    handleChange={handleChange}
                />

                <h5 className="card-title mt-5 mb-3">Card Information</h5>
                <SquarePaymentForm
                    amount={amount}
                    onPaymentSuccess={handleSuccess}
                    billingDetails={billingDetails}
                />
            </div>
        </div>
    );
};

export default SquarePayment;
