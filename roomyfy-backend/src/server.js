import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './config/db.js';

// Routes imports
import chatRoutes from "./routes/chatRoutes.js";
import authRoutes from './routes/authRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

dotenv.config();
connectDB();

const app = express();


// Middleware
app.use(cors({
  origin: ["http://localhost:8080", "http://127.0.0.1:8080"],
  credentials: true
}));
app.use(express.json());


// Test Route
app.get('/', (req, res) => {
    res.send('Roomyfy Backend Running');
});


// API Routes
app.use("/api/chats", chatRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/bookings', bookingRoutes);


// Optional 404 Handler
app.use((req,res)=>{
   res.status(404).json({
      message:"Route not found"
   });
});


// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Backend is running on ${PORT}`);
});