const { readJsonFile, writeJsonFile } = require('../utils/jsonStorage');
const { getAllMedicines } = require('./medicineService');
const crypto = require('crypto');

const RECORDS_FILE = 'medicationRecords.json';

/**
 * Returns today's date formatted as YYYY-MM-DD in the server's local timezone.
 * Assumes local server timezone matching user's deployment environment.
 */
const getTodayDateString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Reads all medication records from medicationRecords.json.
 */
const getAllRecords = async () => {
  return await readJsonFile(RECORDS_FILE, []);
};

/**
 * Automatically retrieves or generates medication schedule records for a user on a given date.
 * If scheduled doses do not exist yet for an active medicine on targetDate, creates them as Pending.
 *
 * @param {string} userId - Authenticated user's ID
 * @param {string} [targetDate] - Date string in YYYY-MM-DD format (defaults to today)
 */
const getOrGenerateScheduleForDate = async (userId, targetDate = getTodayDateString()) => {
  const allMedicines = await getAllMedicines();
  const allRecords = await getAllRecords();

  // 1. Filter active medicines owned by this user on targetDate
  // Rules:
  // - medicine.userId === userId
  // - medicine.startDate <= targetDate
  // - if endDate exists: medicine.endDate >= targetDate
  const activeMedicines = allMedicines.filter((med) => {
    if (med.userId !== userId) return false;
    if (med.startDate > targetDate) return false;
    if (med.endDate && med.endDate < targetDate) return false;
    return true;
  });

  const medicineMap = new Map(allMedicines.map((m) => [m.id, m]));

  let recordsUpdated = false;
  const now = new Date().toISOString();

  // 2. Generate scheduled dose records for each reminder time if not already created
  for (const med of activeMedicines) {
    const times = Array.isArray(med.reminderTimes) ? med.reminderTimes : [];
    for (const time of times) {
      const trimmedTime = time.trim();
      const existing = allRecords.find(
        (r) =>
          r.userId === userId &&
          r.medicineId === med.id &&
          r.scheduledDate === targetDate &&
          r.scheduledTime === trimmedTime
      );

      if (!existing) {
        const newRecord = {
          id: `rec_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`,
          userId,
          medicineId: med.id,
          scheduledDate: targetDate,
          scheduledTime: trimmedTime,
          status: 'Pending',
          takenAt: null,
          createdAt: now,
          updatedAt: now
        };
        allRecords.push(newRecord);
        recordsUpdated = true;
      }
    }
  }

  // 3. Persist new records if any were created
  if (recordsUpdated) {
    await writeJsonFile(RECORDS_FILE, allRecords);
  }

  // 4. Retrieve this user's records for targetDate
  const userDateRecords = allRecords.filter(
    (r) => r.userId === userId && r.scheduledDate === targetDate
  );

  // 5. Enrich with medicine information
  const enrichedRecords = userDateRecords.map((rec) => {
    const med = medicineMap.get(rec.medicineId) || {};
    return {
      ...rec,
      medicineName: med.name || 'Unknown Medicine',
      dosage: med.dosage || '',
      frequency: med.frequency || '',
      instructions: med.instructions || null
    };
  });

  // Sort by scheduledTime ascending (e.g. 08:00 before 13:00 before 20:00)
  enrichedRecords.sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime));

  // 6. Calculate daily adherence summary
  const total = enrichedRecords.length;
  const taken = enrichedRecords.filter((r) => r.status === 'Taken').length;
  const missed = enrichedRecords.filter((r) => r.status === 'Missed').length;
  const pending = enrichedRecords.filter((r) => r.status === 'Pending').length;
  const adherenceRate = total > 0 ? Math.round((taken / total) * 100) : 0;

  return {
    date: targetDate,
    records: enrichedRecords,
    summary: {
      total,
      taken,
      missed,
      pending,
      adherenceRate
    }
  };
};

/**
 * Updates status of a medication record (Pending, Taken, Missed).
 * Verifies that the record belongs to the authenticated user.
 *
 * @param {string} recordId - Unique record ID
 * @param {string} userId - Authenticated user's ID
 * @param {'Pending'|'Taken'|'Missed'} newStatus - New status
 */
const updateRecordStatus = async (recordId, userId, newStatus) => {
  const allRecords = await getAllRecords();
  const index = allRecords.findIndex((r) => r.id === recordId);

  if (index === -1 || allRecords[index].userId !== userId) {
    return null;
  }

  const record = allRecords[index];
  const now = new Date().toISOString();

  record.status = newStatus;
  record.updatedAt = now;

  if (newStatus === 'Taken') {
    record.takenAt = now;
  } else {
    record.takenAt = null;
  }

  allRecords[index] = record;
  await writeJsonFile(RECORDS_FILE, allRecords);

  // Enrich with medicine details
  const allMedicines = await getAllMedicines();
  const med = allMedicines.find((m) => m.id === record.medicineId) || {};

  return {
    ...record,
    medicineName: med.name || 'Unknown Medicine',
    dosage: med.dosage || '',
    frequency: med.frequency || '',
    instructions: med.instructions || null
  };
};

/**
 * Queries medication history logs for an authenticated user with filtering.
 *
 * @param {string} userId - Authenticated user's ID
 * @param {object} filters - { date, startDate, endDate, status, medicineId }
 */
const getHistoryRecords = async (userId, filters = {}) => {
  const allRecords = await getAllRecords();
  const allMedicines = await getAllMedicines();
  const medicineMap = new Map(allMedicines.map((m) => [m.id, m]));

  let userRecords = allRecords.filter((r) => r.userId === userId);

  // Filter by single date
  if (filters.date && typeof filters.date === 'string' && filters.date.trim()) {
    const target = filters.date.trim();
    userRecords = userRecords.filter((r) => r.scheduledDate === target);
  }

  // Filter by date range
  if (filters.startDate && typeof filters.startDate === 'string' && filters.startDate.trim()) {
    userRecords = userRecords.filter((r) => r.scheduledDate >= filters.startDate.trim());
  }
  if (filters.endDate && typeof filters.endDate === 'string' && filters.endDate.trim()) {
    userRecords = userRecords.filter((r) => r.scheduledDate <= filters.endDate.trim());
  }

  // Filter by status (Taken, Missed, Pending)
  if (filters.status && filters.status !== 'All' && typeof filters.status === 'string') {
    const normalizedStatus = filters.status.trim().toLowerCase();
    userRecords = userRecords.filter((r) => r.status.toLowerCase() === normalizedStatus);
  }

  // Filter by medicineId
  if (filters.medicineId && typeof filters.medicineId === 'string' && filters.medicineId.trim()) {
    userRecords = userRecords.filter((r) => r.medicineId === filters.medicineId.trim());
  }

  // Enrich with medicine details
  const enriched = userRecords.map((rec) => {
    const med = medicineMap.get(rec.medicineId) || {};
    return {
      ...rec,
      medicineName: med.name || 'Unknown Medicine',
      dosage: med.dosage || '',
      frequency: med.frequency || '',
      instructions: med.instructions || null
    };
  });

  // Sort descending: latest date first, then latest time first
  enriched.sort((a, b) => {
    const dateComp = b.scheduledDate.localeCompare(a.scheduledDate);
    if (dateComp !== 0) return dateComp;
    return b.scheduledTime.localeCompare(a.scheduledTime);
  });

  return enriched;
};

module.exports = {
  getTodayDateString,
  getOrGenerateScheduleForDate,
  updateRecordStatus,
  getHistoryRecords
};
