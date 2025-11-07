// src/pages/TeeTimeConfirmation.js
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { format24to12 } from '../util/FormatTime';

function TeeTimeConfirmation() {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    // location.state is the selected tee time object
    const selectedTeeTime = location.state || {};
    const { date, time, num_golfers } = selectedTeeTime;

    const [golfersInput, setGolfersInput] = useState(num_golfers || 1);
    const [confirmationMessage, setConfirmationMessage] = useState('');

    const pricePerGolfer = 50;
    const totalAmount = golfersInput * pricePerGolfer;

    useEffect(() => {
        if (time && golfersInput) {
            setConfirmationMessage(`Confirm tee time:`);
        } else {
            setConfirmationMessage('Please select a tee time and number of golfers.');
        }
    }, [time, golfersInput, date]);

    const handleNumGolfersChange = (e) => {
        const newNumGolfers = parseInt(e.target.value);
        if (isNaN(newNumGolfers) || newNumGolfers < 1) return; // basic validation

        setGolfersInput(newNumGolfers);

        // Update user context with new tee time info
        setUser((prev) => ({
            ...prev,
            tee_time: {
                ...prev.tee_time,
                num_golfers: newNumGolfers,
                amount: newNumGolfers * pricePerGolfer,
            },
        }));
    };

    const handleConfirm = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!user?.customer_id || !token) {
            alert("You must be logged in to make a payment.");
            navigate('/login');
            return;
        }
        navigate('/square_payment', {
            state: {
                amount: totalAmount,
                tee_time: time,
                date: date,
                num_golfers: golfersInput,
                customer_id: user?.customer_id,
            },
        });
    };

    const formattedDate = date
        ? new Date(date).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        : 'No date selected';


    return (
        <div
            style={{
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
            }}
        >
            <div
                style={{
                    background: 'rgba(255,255,255,0.90)',
                    padding: '1.5rem 2rem',
                    borderRadius: '8px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                    minWidth: '350px',
                    maxWidth: '500px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <h3>Tee Time Confirmation</h3>
                <h4 style={{ marginTop: '2rem' }}>{format24to12(time) || 'No time selected'}</h4>

                <h4 style={{ marginTop: '0.5rem' }}>{formattedDate || 'No date selected'}</h4>
                <p>{confirmationMessage}</p>

                <form onSubmit={handleConfirm} style={{ width: '100%' }}>
                    <label htmlFor="num_golfers" style={{ display: 'block', marginBottom: '0.5rem' }}>
                        Number of Golfers
                    </label>
                    <input
                        type="number"
                        id="num_golfers"
                        name="num_golfers"
                        min="1"
                        max={num_golfers}
                        // restrict input to a maximum of numGolfers, which is the availble slots.
                        value={golfersInput}
                        onChange={handleNumGolfersChange}
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '1rem' }}
                    />
                    <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
                        <strong>Total Amount: ${totalAmount.toFixed(2)}</strong>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            style={{
                                background: '#b71c1c',
                                color: '#fff',
                                padding: '0.75rem 1.5rem',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            style={{
                                background: '#2e7d32',
                                color: '#fff',
                                padding: '0.75rem 1.5rem',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            Confirm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TeeTimeConfirmation;
