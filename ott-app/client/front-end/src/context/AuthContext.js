/// /context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext();
const token = localStorage.getItem('token');

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = (token) => {
    localStorage.setItem('token', token);
    const decoded = jwtDecode(token);
    setUser({
      email: decoded.email,
      customer_id: decoded.customer_id,
      admin: decoded.isAdmin
    });
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {

    const fetchUserProfile = async (token) => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        const userData = res.data;
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        logout();
      }
    };
    
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
          console.warn('Token expired');
          localStorage.removeItem('token');
          return;
        }
        fetchUserProfile(token);
        setIsLoggedIn(true);
      } catch (err) {
        console.error('Invalid token:', err);
        localStorage.removeItem('token');
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

//
