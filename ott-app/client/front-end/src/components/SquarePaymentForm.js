// src/components/SquarePaymentForm.js
import { useEffect, useRef } from 'react';
import axios from 'axios';


const SquarePaymentForm = ({ amount, onPaymentSuccess }) => {
    const payments = useRef(null);
    const card = useRef(null);
    useEffect(() => {
        const initSquare = async () => {
            if (!window.Square) {
                console.error('Square JS not loaded');
                return;
            }

            try {
                // Don't reinit if already initialized
                if (payments.current || card.current) {
                    console.warn('Square already initialized, skipping reinitialization');
                    return;
                }

                const paymentsInstance = await window.Square.payments(
                    process.env.REACT_APP_SQUARE_APP_ID,
                    process.env.REACT_APP_SQUARE_LOCATION_ID
                );

                const cardInstance = await paymentsInstance.card();
                await cardInstance.attach('#card-container');

                payments.current = paymentsInstance;
                card.current = cardInstance;
            } catch (e) {
                console.error('Square init error:', e);
            }
        };

        initSquare();

        // Clean up to prevent double attachment
        return () => {
            const container = document.getElementById('card-container');
            if (container) container.innerHTML = '';
            payments.current = null;
            card.current = null;
        };
    }, []);

    const handlePayment = async () => {
        try {
            const result = await card.current.tokenize();
            if (result.status === 'OK') {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/process-payment`, {
                    nonce: result.token,
                    amount: Math.round(amount * 100),
                }, {
                    withCredentials: true // only if you need cookies/auth headers
                });

                const data = response.data;        // <-- updated to axios syntax
                if (data.success) {
                    onPaymentSuccess(data);
                } else {
                    alert(`Payment failed: ${data.error || 'Unknown error'}`);
                }
            } else {
                console.error('Tokenization failed:', result);
                alert('Card tokenization failed. Please check your card details.');
            }
        } catch (err) {
            console.error('Payment error:', err);
            alert('An error occurred during payment.');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <div id="card-container" style={{ width: '100%', marginBottom: '20px' }}></div>
            <p style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
                Total Amount: ${(amount).toFixed(2)}
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
                <button
                    onClick={() => window.history.back()}
                    style={{
                        backgroundColor: '#dc3545',
                        color: '#fff',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Cancel
                </button>
                <button
                    type='button'
                    onClick={handlePayment}
                    style={{
                        backgroundColor: '#28a745',
                        color: '#fff',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Submit Payment
                </button>
            </div>
        </div>
    );
};

export default SquarePaymentForm;
