import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import paymentRoutes from './routes/payments.js';
import teeTimeRoutes from './routes/teetimes.js';
import customerRoutes from './routes/customers.js';
import { createDbConnection } from './config/db.js';

dotenv.config();

const app = express();

// const allowedOrigins = [
//     'http://localhost:3000',
//     process.env.CLIENT_ORIGIN,
// ].filter(Boolean);

// app.use(cors({
//     origin: allowedOrigins,
//     credentials: true,
// }));

const allowedOrigins = [
  'http://localhost:3000',
  process.env.CLIENT_ORIGIN,
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin like mobile apps or curl requests
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));


app.use(express.json());

app.use('/api', paymentRoutes(process.env.SQUARE_ACCESS_TOKEN, process.env.SQUARE_LOCATION_ID));
app.use('/api', authRoutes(process.env.JWT_SECRET));
app.use('/api', teeTimeRoutes());
app.use('/api', customerRoutes());


async function startServer() {
    try {
        const db = await createDbConnection();
        if (!db) { console.error("Database connection failed"); }
        app.locals.db = db;

        const PORT = process.env.PORT || 8080;

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Database connection failed:', error.message);
        console.error(error); // This shows sqlState or code
        process.exit(1);
    }
}

startServer();

app.get("/", async (req, res) => {
    return res.json({ message: "Server is running" });
});