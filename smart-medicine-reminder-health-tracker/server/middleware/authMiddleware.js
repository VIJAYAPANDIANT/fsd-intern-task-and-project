const jwt = require('jsonwebtoken');
const { findUserById, sanitizeUser } = require('../services/userService');

/**
 * Authentication Middleware
 * Validates JWT token from the Authorization header (Bearer <token>)
 * and attaches verified user info to req.user.
 */
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No authentication token provided.'
      });
    }

    const token = authHeader.split(' ')[1]?.trim();
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Token is missing or malformed.'
      });
    }

    const secret = process.env.JWT_SECRET || 'meditrack_default_jwt_secret_key_college_fsd_2026';

    let decoded;
    try {
      decoded = jwt.verify(token, secret);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Authentication token has expired. Please log in again.'
        });
      }
      return res.status(401).json({
        success: false,
        message: 'Invalid authentication token.'
      });
    }

    // Retrieve user from storage using the verified ID from the token payload
    // We NEVER trust any user ID passed in req.body, req.query, or req.params!
    const user = await findUserById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User account associated with this token no longer exists.'
      });
    }

    // Attach safe user profile and ID
    req.user = sanitizeUser(user);
    req.userId = user.id;

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Authentication check failed: ' + error.message
    });
  }
};

module.exports = authMiddleware;
