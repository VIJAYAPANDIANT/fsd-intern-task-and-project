const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  getTodaySchedule,
  changeRecordStatus,
  getHistory
} = require('../controllers/recordController');

// All tracking and history routes require valid JWT authentication
router.use(authMiddleware);

// Route handlers
router.get('/today', getTodaySchedule);
router.patch('/:id/status', changeRecordStatus);
router.get('/history', getHistory);

module.exports = router;
