const {
  getTodayDateString,
  getOrGenerateScheduleForDate,
  updateRecordStatus,
  getHistoryRecords
} = require('../services/recordService');

// Validates ISO date format YYYY-MM-DD
const isValidDateFormat = (dateStr) => {
  if (typeof dateStr !== 'string') return false;
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateStr.trim())) return false;
  const parsed = new Date(dateStr.trim());
  return !isNaN(parsed.getTime());
};

/**
 * GET /api/records/today
 * Retrieves (and auto-generates if missing) today's scheduled doses for the authenticated user.
 * Optional query parameter: ?date=YYYY-MM-DD
 */
const getTodaySchedule = async (req, res, next) => {
  try {
    const userId = req.userId;
    const dateParam = req.query.date ? req.query.date.trim() : getTodayDateString();

    if (!isValidDateFormat(dateParam)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date parameter. Must be in YYYY-MM-DD format.'
      });
    }

    const scheduleData = await getOrGenerateScheduleForDate(userId, dateParam);

    return res.status(200).json({
      success: true,
      message: "Daily medication schedule retrieved successfully",
      data: scheduleData
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/records/:id/status
 * Updates status of a scheduled dose record (Taken, Missed, Pending).
 * Verifies ownership; returns 404 if not found or owned by another user.
 */
const changeRecordStatus = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { status } = req.body;

    if (!status || typeof status !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Status is required and must be "Pending", "Taken", or "Missed".'
      });
    }

    const normalizedStatus = status.trim();
    const validStatuses = ['Pending', 'Taken', 'Missed'];
    const matchedStatus = validStatuses.find(
      (s) => s.toLowerCase() === normalizedStatus.toLowerCase()
    );

    if (!matchedStatus) {
      return res.status(400).json({
        success: false,
        message: `Invalid status "${status}". Allowed values: Pending, Taken, Missed.`
      });
    }

    const updatedRecord = await updateRecordStatus(id, userId, matchedStatus);

    if (!updatedRecord) {
      return res.status(404).json({
        success: false,
        message: 'Medication record not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: `Medication marked as ${matchedStatus}`,
      data: updatedRecord
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/records/history
 * Retrieves historical medication intake logs with optional filtering by date, status, or medicine.
 */
const getHistory = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { date, startDate, endDate, status, medicineId } = req.query;

    const records = await getHistoryRecords(userId, {
      date,
      startDate,
      endDate,
      status,
      medicineId
    });

    return res.status(200).json({
      success: true,
      message: 'Medication history retrieved successfully',
      data: records
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTodaySchedule,
  changeRecordStatus,
  getHistory
};
