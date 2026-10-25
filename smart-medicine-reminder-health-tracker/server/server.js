const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Ensure .env is loaded reliably relative to server directory
dotenv.config({ path: path.join(__dirname, '.env') });

const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');
const healthRoutes = require('./routes/healthRoutes');
const authRoutes = require('./routes/authRoutes');
const medicineRoutes = require('./routes/medicineRoutes');
const recordRoutes = require('./routes/recordRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// CORS configuration for frontend
app.use(cors({
  origin: [
    CLIENT_URL,
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://health-tracker-khaki-nine.vercel.app'
  ],
  credentials: true
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root welcome endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    name: 'Smart Medicine Reminder & Health Tracker API',
    version: '1.0.0',
    status: 'online',
    endpoints: {
      healthCheck: 'GET /api/health',
      authRegister: 'POST /api/auth/register',
      authLogin: 'POST /api/auth/login',
      authMe: 'GET /api/auth/me',
      medicines: {
        list: 'GET /api/medicines',
        getOne: 'GET /api/medicines/:id',
        create: 'POST /api/medicines',
        update: 'PUT /api/medicines/:id',
        delete: 'DELETE /api/medicines/:id'
      },
      records: {
        todaySchedule: 'GET /api/records/today',
        updateStatus: 'PATCH /api/records/:id/status',
        history: 'GET /api/records/history'
      }
    }
  });
});

// API Routes
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/records', recordRoutes);

// Error Handling Middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Medicine Reminder Backend Server running on http://localhost:${PORT}`);
  console.log(`🩺 Health check available at: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Auth API available at: http://localhost:${PORT}/api/auth`);
  console.log(`💊 Medicine CRUD API available at: http://localhost:${PORT}/api/medicines`);
  console.log(`📋 Tracking & Records API available at: http://localhost:${PORT}/api/records`);
});

module.exports = app;
