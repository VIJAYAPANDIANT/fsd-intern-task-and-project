/**
 * Health Controller
 * Confirms that backend server is active and reachable
 */

const getHealthStatus = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Smart Medicine Reminder & Health Tracker API is running smoothly',
    timestamp: new Date().toISOString(),
    uptime: `${process.uptime().toFixed(1)}s`,
    environment: process.env.NODE_ENV || 'development'
  });
};

module.exports = {
  getHealthStatus
};
