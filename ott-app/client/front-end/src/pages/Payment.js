import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import formatExpDate from '../util/FormatExpDate';
import axios from 'axios';


function Payment() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

const handlePayNow = async (card_name, amount, card_number, exp_date, cvv) => {
    const token = localStorage.getItem('token');

    if (!user?.customer_id || !token) {
        alert("You must be logged in to make a payment.");
        navigate('/login');
        return;
    }

    const payment_date = new Date().toISOString().split('T')[0];
    const last4 = card_number.slice(-4);

    const payment = {
        customer_id: user.customer_id,
        card_name,
        amount,
        card_number,
        exp_date,
        cvv,
        payment_date
    };

    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/update_payments`,
            payment,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            }
        );

        if (response.status === 200 && (!response.data.error && response.data.message !== 'Payment failed')) {
            const paymentId = response.data.payment_id;
            navigate('/payment_success', {
                state: {
                    paymentId,
                    amount,
                    last4,
                    time: user.tee_time?.time,
                    num_golfers: user.tee_time?.num_golfers,
                }
            });
        } else {
            alert('Payment failed: ' + (response.data.message || 'Unknown error'));
        }
    } catch (error) {
        console.error('Payment error:', error);
        alert('An error occurred while processing your payment. Please try again.');
    }
};


    return (
        <div style={{
            minHeight: '100vh',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundImage: `url(${require('../images/golf_login.jpg')})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundAttachment: 'fixed',
            padding: 0,
            margin: 0,
        }}>
            <div style={{
                background: 'rgba(255,255,255,0.90)',
                padding: '1.5rem 2rem',
                borderRadius: '8px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                minWidth: '350px',
                marginLeft: '2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <h3>TeeTime Payment</h3>
                <form
                    style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}
                    onSubmit={(e) => {
                        e.preventDefault();
                        const form = e.target;
                        const card_name = form.card_name.value;
                        // Get amount from tee_time if available
                        if (!user || !user.tee_time || typeof user.tee_time.amount !== 'number') {
                            alert('Unable to determine payment amount. Please select a tee time first.');
                            return;
                        }
                        const amount = user.tee_time.amount;
                        const card_number = form.card_number.value;
                        let formated_exp = formatExpDate(form.exp_date.value);
                        const cvv = form.cvv.value;
                        handlePayNow(card_name, amount, card_number, formated_exp, cvv);
                    }}
                >
                    <label>
                        Name on Card
                        <input type="text" name="card_name" required style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }} />
                    </label>
                    <label>
                        Card Number
                        <input type="text" name="card_number" maxLength="19" required pattern="\d{16,19}" style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }} />
                    </label>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <label style={{ flex: 1 }}>
                            Expiry Date
                            <input
                                type="text"
                                name="exp_date"
                                placeholder="MM/YY"
                                required
                                pattern="^(0[1-9]|1[0-2])\/([0-9]{2})$"
                                maxLength="5"
                                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                                title="Format: MM/YY"
                            />
                        </label>
                        <label style={{ flex: 1 }}>
                            CVV
                            <input type="password" name="cvv" maxLength="4" required pattern="\d{3,4}" style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }} />
                        </label>
                    </div>

                    <button
                        type="submit"
                        style={{ marginTop: '1rem', padding: '0.75rem', background: '#2e7d32', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                        Pay Now
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Payment;
