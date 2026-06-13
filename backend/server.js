const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { seedDatabase } = require('./utils/seedData');

// Load environment variables
dotenv.config({ override: true });

// Initialize Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to Database and Seed Data
connectDB().then(() => {
  seedDatabase();
});

// Import Route Handlers
const authRoutes = require('./routes/authRoutes');
const gemstoneRoutes = require('./routes/gemstoneRoutes');
const horoscopeRoutes = require('./routes/horoscopeRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Mount Route Handlers
app.use('/api/auth', authRoutes);
app.use('/api/gemstones', gemstoneRoutes);
app.use('/api/horoscope', horoscopeRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/admin', adminRoutes);

// Health Check API
app.get('/api/status', (req, res) => {
  res.json({
    success: true,
    message: 'Astrology & Gemstone platform API is running smoothly',
    timestamp: new Date()
  });
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  console.error('Express Error Handler:', err.message);
  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
}

module.exports = app;
