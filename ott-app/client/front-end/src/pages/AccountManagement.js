import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';


const AccountManagement = () => {
    const token = localStorage.getItem('token');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [first_name, setFirstName] = React.useState('');
    const [last_name, setLastName] = React.useState('');

    // ...your existing state
    const { user, setUser } = useContext(AuthContext);


    const navigate = useNavigate(); // allows redirection after signup

    React.useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                });
                if (res.data) {
                    setEmail(res.data.email || '');
                    setPassword(''); // Don't set password from response for security
                    setFirstName(res.data.first_name || '');
                    setLastName(res.data.last_name || '');
                }
            } catch (err) {
                console.error('Failed to fetch user details:', err);
            }
        };
        fetchUserDetails();
    }, [token]);

    // should make the MySQL change to customer table, then route to tee_times
const handleSubmit = async (e) => {
  e.preventDefault();

  // Check if anything has changed
  if (
    email === user.email &&
    first_name === user.first_name &&
    last_name === user.last_name &&
    password.trim() === '' // password unchanged if blank
  ) {
    alert('Nothing changed.');
    return;
  }

  // Build update payload conditionally including password
  const updatedData = {
    customer_id: user.customer_id,
    email,
    first_name,
    last_name,
  };

  if (password.trim() !== '') {
    updatedData.password = password;
  }

  try {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/api/update_customer`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      }
    );

    alert('Account changed successfully!');

    // Fetch updated user data
    try {
    const userRes = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/customer/${user.customer_id}`,
      {
        headers: {
        Authorization: `Bearer ${token}`
        },
        withCredentials: true
      }
    );
      setUser(userRes.data);
    } catch (fetchErr) {
      console.error('Failed to fetch updated user:', fetchErr);
    }

    navigate('/account_management'); // or wherever you want to redirect

  } catch (err) {
    if (err.response?.status === 400) {
      alert(err.response.data.message);
    } else {
      alert('Something went wrong. Please try again.');
      console.error(err);
    }
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
            <form
                onSubmit={handleSubmit}
                style={{
                    background: 'rgba(255,255,255,0.95)',
                    padding: '2rem 2.5rem',
                    borderRadius: '10px',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                    minWidth: '400px'
                }}
            >
                <h2 style={{
                    textAlign: 'center',
                    marginBottom: '1.5rem',
                    color: '#4f46e5',
                    letterSpacing: '1px'
                }}>Edit Account</h2>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333' }}>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            borderRadius: '6px',
                            border: '1px solid #d1d5db',
                            fontSize: '1rem'
                        }}
                    />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333' }}>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        // required
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            borderRadius: '6px',
                            border: '1px solid #d1d5db',
                            fontSize: '1rem'
                        }}
                        placeholder="Change your current password"
                    />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333' }}>First Name</label>
                    <input
                        type="text" // Use valid input type
                        value={first_name} // Controlled input bound to state
                        onChange={e => setFirstName(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            borderRadius: '6px',
                            border: '1px solid #d1d5db',
                            fontSize: '1rem'
                        }}
                    />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333' }}>Last Name</label>
                    <input
                        type="text" // Use valid input type
                        value={last_name} // Controlled input bound to state
                        onChange={e => setLastName(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            borderRadius: '6px',
                            border: '1px solid #d1d5db',
                            fontSize: '1rem'
                        }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: '#4f46e5',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                    }}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AccountManagement;