import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/common/routes/auth.routes.js';
import movieRoutes from './src/common/routes/movie.routes.js';
import bookingRoutes from './src/common/routes/booking.routes.js';
import './src/common/config/db.js'; // Initialize database

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/bookings', bookingRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Movie Tickets Platform API' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});