import axios from 'axios';

// console.log(process.env.REACT_APP_API_URL);

export async function loginAndGetToken(email, password) {
  if (!process.env.REACT_APP_API_URL) {
    throw new Error('REACT_APP_API_URL environment variable is not set.');
  }
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, {
      email,
      password,
    });
    return response.data.token; 
  } catch (error) {
    throw new Error('Login failed: ' + error.message);
  }
}