import React, { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import axios from 'axios';

function PaymentSuccess() {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Try to get from state, fallback to URL param
  const paymentId = location.state?.paymentId || searchParams.get("payment_id");
  const amount = location.state?.amount;
  const last4 = location.state?.last4;
  const date = location.state?.date || new Date().toLocaleDateString();
  const time = location.state?.time;
  const num_golfers = location.state?.num_golfers;

  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState(null);


  useEffect(() => {
    if (!paymentId) {
      setLoading(false);
      return;
    }

    async function fetchPayment() {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/square_payment/${paymentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        // Axios puts response data in res.data, so adjust below:
        const data = res.data;
        setPayment(data);
      } catch (err) {
        console.error("Error fetching payment:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPayment();
  }, [paymentId]);

  if (loading) return <p>Loading...</p>;

  if (!paymentId) return <p>No payment ID specified.</p>;

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
      <div className="card shadow" style={{ minWidth: 350, maxWidth: 400, background: '#fff', opacity: 0.97 }}>
        <div className="card-body">
          <h2 className="card-title text-success mb-3">Payment Successful!</h2>
          <p className="card-text">
            <strong>Amount paid:</strong> ${amount ? amount.toFixed(2) : payment?.amount?.toFixed(2)}
          </p>
          <p className="card-text">
            <strong>Card ending in:</strong> **** **** **** {last4 || "XXXX"}
          </p>
          <p className="card-text">
            <strong>Tee time:</strong> {date}, {time || "N/A"}
          </p>
          <p className="card-text">
            <strong>Number of golfers:</strong> {num_golfers || "N/A"}
          </p>
          {payment && payment.payment_date && (
            <p className="card-text">
              <strong>Payment Date:</strong> {payment.payment_date}
            </p>
          )}
          <p className="card-text">
            <strong>Payment ID:</strong> {payment.id}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
