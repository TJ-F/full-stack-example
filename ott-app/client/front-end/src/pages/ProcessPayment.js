import axios from 'axios';

const ProcessPayment = async (cardName, amount, cardNumber, expiry, cvv) => {
  try {
    const payload = {
      payment_id: null,
      customer_id: 1, // Replace with real ID from context/login
      card_name: cardName,
      amount: amount, // Replace with dynamic total if needed
      card_number: cardNumber,
      exp_date: expiry.replace('/', ''), // remove "/" to return 4 digits
      cvv: cvv,
      payment_date: new Date().toISOString().split('T')[0], // today's date
    };


    await axios.post(`${process.env.REACT_APP_API_URL}/update_payment`, payload);

    alert('Payment processed!');
  } catch (err) {

    alert('Payment failed.');
  }
};

export default ProcessPayment;