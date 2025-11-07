import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export default function verifyToken(req, res, next) {
  try {

    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(403).json({ message: 'No token provided or invalid format' });
    }

    const token = authHeader.split(' ')[1];

    if (!JWT_SECRET) {
      // console.error('JWT_SECRET not set in environment');
      return res.status(500).json({ message: 'Internal server error' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        // console.error('Token verification failed:', err);
        return res.status(403).json({ message: 'Failed to authenticate token' });
      }

      if (!decoded.customer_id) {
        // console.error('Decoded token missing customer_id:', decoded);
        return res.status(403).json({ message: 'Invalid token payload' });
      }

      req.user = decoded;
      req.customer_id = decoded.customer_id;
      next();
    });

  } catch (err) {
    console.error('Unexpected error during token verification:', err);
    return res.status(500).json({ message: 'Token verification failed unexpectedly' });
  }
}

