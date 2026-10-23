const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  getMedicines,
  getOneMedicine,
  addMedicine,
  updateOneMedicine,
  deleteOneMedicine
} = require('../controllers/medicineController');

// All medicine endpoints require valid JWT authentication
router.use(authMiddleware);

// Route handlers
router.get('/', getMedicines);
router.get('/:id', getOneMedicine);
router.post('/', addMedicine);
router.put('/:id', updateOneMedicine);
router.delete('/:id', deleteOneMedicine);

module.exports = router;
