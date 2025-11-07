import { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Login({ onLogin }) {
    const { login } = useContext(AuthContext);

    const [loginClicked, setLoginClicked] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, {
                email,
                password
            });
            login(res.data.token);
            if (onLogin) onLogin();
        } catch (err) {
            alert('Login failed, please try again');
            console.error('Login error:', err);
        }
        setLoginClicked(true);
    };

    useEffect(() => {
        if (loginClicked) {
            axios.post(`${process.env.REACT_APP_API_URL}/api/check_customer`, {
                email,
                password
            })
                .then(res => {
                    //console.log('Customer check response:', res.data);
                })
                .catch(err => {
                    console.error('Error checking customer:', err);
                })
                .finally(() => setLoginClicked(false));
        }
    }, [loginClicked, email, password]);


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
                    minWidth: '400px',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <h2 style={{
                    textAlign: 'center',
                    marginBottom: '1.5rem',
                    color: '#4f46e5',
                    letterSpacing: '1px'
                }}>Login</h2>
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
                    Login
                </button>
                <div style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    marginTop: '1.5rem'
                }}>
                    <p style={{ fontSize: '0.9rem', margin: 0 }}>
                        Don't have an account? <Link to='/signup'>Sign up</Link> for free!
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Login;
