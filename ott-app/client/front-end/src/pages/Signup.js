import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [first_name, setFirstName] = React.useState('');
    const [last_name, setLastName] = React.useState('');

    const navigate = useNavigate(); // allows redirection after signup

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, {
                email,
                password,
                first_name,
                last_name
            });

            alert('Account created successfully!');
            navigate('/login');
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
                }}>Create Account</h2>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333' }}>Email</label>
                    <input
                        type="email"
                        name='email'
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
                        placeholder="Enter your email"
                    />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333' }}>Password</label>
                    <input
                        type="password"
                        name='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            borderRadius: '6px',
                            border: '1px solid #d1d5db',
                            fontSize: '1rem'
                        }}
                        placeholder="Enter your password"
                    />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333' }}>First Name</label>
                    <input
                        type="first_name"
                        name='first_name'
                        value={first_name}
                        onChange={e => setFirstName(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            borderRadius: '6px',
                            border: '1px solid #d1d5db',
                            fontSize: '1rem'
                        }}
                        placeholder="Enter your first name"
                    />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333' }}>Last Name</label>
                    <input
                        type="last_name"
                        name='last_name'
                        value={last_name}
                        onChange={e => setLastName(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            borderRadius: '6px',
                            border: '1px solid #d1d5db',
                            fontSize: '1rem'
                        }}
                        placeholder="Enter your last name"
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

export default Signup;