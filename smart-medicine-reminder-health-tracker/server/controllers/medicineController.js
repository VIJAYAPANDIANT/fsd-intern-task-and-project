const {
  getMedicinesByUserId,
  getMedicineById,
  createMedicine,
  updateMedicine,
  deleteMedicine
} = require('../services/medicineService');

// Validates 24-hour time string in HH:mm format (00:00 - 23:59)
const isValidTimeFormat = (timeStr) => {
  if (typeof timeStr !== 'string') return false;
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  return timeRegex.test(timeStr.trim());
};

// Validates ISO date in YYYY-MM-DD format
const isValidDateFormat = (dateStr) => {
  if (typeof dateStr !== 'string') return false;
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateStr.trim())) return false;
  const parsed = new Date(dateStr.trim());
  return !isNaN(parsed.getTime());
};

/**
 * GET /api/medicines
 * Returns all medicines owned by the authenticated user (supports optional query filters: name, frequency)
 */
const getMedicines = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { name, frequency } = req.query;

    const medicines = await getMedicinesByUserId(userId, { name, frequency });

    return res.status(200).json({
      success: true,
      message: 'Medicines retrieved successfully',
      data: medicines
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/medicines/:id
 * Returns a specific medicine by ID (verifies ownership)
 */
const getOneMedicine = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const medicine = await getMedicineById(id, userId);

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: 'Medicine not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Medicine retrieved successfully',
      data: medicine
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/medicines
 * Creates a new medicine record for the authenticated user
 */
const addMedicine = async (req, res, next) => {
  try {
    const userId = req.userId;
    const {
      name,
      dosage,
      frequency,
      reminderTimes,
      startDate,
      endDate,
      instructions
    } = req.body;

    // 1. Validate required fields
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Medicine name is required.'
      });
    }

    if (!dosage || typeof dosage !== 'string' || !dosage.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Dosage is required (e.g., "1 tablet", "500 mg").'
      });
    }

    if (!frequency || typeof frequency !== 'string' || !frequency.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Frequency is required (e.g., "Once daily", "Twice daily").'
      });
    }

    // 2. Validate reminderTimes array
    if (!reminderTimes || !Array.isArray(reminderTimes) || reminderTimes.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one reminder time is required.'
      });
    }

    for (const time of reminderTimes) {
      if (!isValidTimeFormat(time)) {
        return res.status(400).json({
          success: false,
          message: `Invalid reminder time "${time}". Times must be in 24-hour HH:mm format (e.g., "08:00", "20:30").`
        });
      }
    }

    // 3. Validate startDate format
    if (!startDate || !isValidDateFormat(startDate)) {
      return res.status(400).json({
        success: false,
        message: 'Start date is required and must be in YYYY-MM-DD format.'
      });
    }

    // 4. Validate endDate if supplied
    if (endDate && typeof endDate === 'string' && endDate.trim()) {
      if (!isValidDateFormat(endDate)) {
        return res.status(400).json({
          success: false,
          message: 'End date must be in YYYY-MM-DD format.'
        });
      }

      if (endDate.trim() < startDate.trim()) {
        return res.status(400).json({
          success: false,
          message: 'End date cannot be earlier than start date.'
        });
      }
    }

    // 5. Create medicine record
    const newMedicine = await createMedicine({
      userId,
      name,
      dosage,
      frequency,
      reminderTimes,
      startDate,
      endDate,
      instructions
    });

    return res.status(201).json({
      success: true,
      message: 'Medicine created successfully',
      data: newMedicine
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/medicines/:id
 * Updates an existing medicine record (verifies ownership)
 */
const updateOneMedicine = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const updateData = req.body;

    // 1. Verify that medicine exists and belongs to the user
    const existing = await getMedicineById(id, userId);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Medicine not found'
      });
    }

    // 2. Validate field inputs if provided in update payload
    if (updateData.name !== undefined) {
      if (typeof updateData.name !== 'string' || !updateData.name.trim()) {
        return res.status(400).json({
          success: false,
          message: 'Medicine name cannot be empty.'
        });
      }
    }

    if (updateData.dosage !== undefined) {
      if (typeof updateData.dosage !== 'string' || !updateData.dosage.trim()) {
        return res.status(400).json({
          success: false,
          message: 'Dosage cannot be empty.'
        });
      }
    }

    if (updateData.frequency !== undefined) {
      if (typeof updateData.frequency !== 'string' || !updateData.frequency.trim()) {
        return res.status(400).json({
          success: false,
          message: 'Frequency cannot be empty.'
        });
      }
    }

    if (updateData.reminderTimes !== undefined) {
      if (!Array.isArray(updateData.reminderTimes) || updateData.reminderTimes.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Reminder times must be a non-empty array.'
        });
      }

      for (const time of updateData.reminderTimes) {
        if (!isValidTimeFormat(time)) {
          return res.status(400).json({
            success: false,
            message: `Invalid reminder time "${time}". Times must be in 24-hour HH:mm format.`
          });
        }
      }
    }

    const effectiveStartDate = updateData.startDate !== undefined ? updateData.startDate : existing.startDate;
    const effectiveEndDate = updateData.endDate !== undefined ? updateData.endDate : existing.endDate;

    if (updateData.startDate !== undefined) {
      if (!isValidDateFormat(updateData.startDate)) {
        return res.status(400).json({
          success: false,
          message: 'Start date must be in YYYY-MM-DD format.'
        });
      }
    }

    if (effectiveEndDate && typeof effectiveEndDate === 'string' && effectiveEndDate.trim()) {
      if (!isValidDateFormat(effectiveEndDate)) {
        return res.status(400).json({
          success: false,
          message: 'End date must be in YYYY-MM-DD format.'
        });
      }

      if (effectiveEndDate.trim() < effectiveStartDate.trim()) {
        return res.status(400).json({
          success: false,
          message: 'End date cannot be earlier than start date.'
        });
      }
    }

    // 3. Perform update (preserves id, userId, createdAt)
    const updated = await updateMedicine(id, userId, updateData);

    return res.status(200).json({
      success: true,
      message: 'Medicine updated successfully',
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/medicines/:id
 * Deletes a medicine record (verifies ownership)
 */
const deleteOneMedicine = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const deleted = await deleteMedicine(id, userId);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Medicine not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Medicine deleted successfully',
      data: {
        id: deleted.id,
        name: deleted.name
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMedicines,
  getOneMedicine,
  addMedicine,
  updateOneMedicine,
  deleteOneMedicine
};
