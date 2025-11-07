import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Explicit fallback if process.env.JWT_SECRET isn't set yet
const secret = process.env.JWT_SECRET || 'super_secret_test_key';

function generateTestToken(isAdmin = false) {
  return jwt.sign(
    { customer_id: 1, isAdmin: isAdmin },
    secret,
    { expiresIn: '1h' }
  );
}

export { generateTestToken };
