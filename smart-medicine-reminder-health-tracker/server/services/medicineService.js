const { readJsonFile, writeJsonFile } = require('../utils/jsonStorage');
const crypto = require('crypto');

const MEDICINES_FILE = 'medicines.json';

/**
 * Reads all medicines from medicines.json.
 */
const getAllMedicines = async () => {
  return await readJsonFile(MEDICINES_FILE, []);
};

/**
 * Retrieves medicines owned by a specific user with optional filters.
 * @param {string} userId - Authenticated user's ID
 * @param {object} filters - Optional query filters (name, frequency)
 */
const getMedicinesByUserId = async (userId, filters = {}) => {
  const medicines = await getAllMedicines();
  let userMedicines = medicines.filter((m) => m.userId === userId);

  // Optional filter by medicine name (case-insensitive substring)
  if (filters.name && typeof filters.name === 'string') {
    const searchName = filters.name.trim().toLowerCase();
    userMedicines = userMedicines.filter((m) =>
      m.name.toLowerCase().includes(searchName)
    );
  }

  // Optional filter by frequency (case-insensitive substring)
  if (filters.frequency && typeof filters.frequency === 'string') {
    const searchFreq = filters.frequency.trim().toLowerCase();
    userMedicines = userMedicines.filter((m) =>
      m.frequency.toLowerCase().includes(searchFreq)
    );
  }

  return userMedicines;
};

/**
 * Retrieves a single medicine by ID and verifies user ownership.
 * Returns null if not found or if owned by another user.
 * @param {string} id - Medicine ID
 * @param {string} userId - Authenticated user's ID
 */
const getMedicineById = async (id, userId) => {
  const medicines = await getAllMedicines();
  const medicine = medicines.find((m) => m.id === id);

  if (!medicine || medicine.userId !== userId) {
    return null;
  }

  return medicine;
};

/**
 * Creates and persists a new medicine record.
 * Derives userId strictly from authenticated JWT.
 */
const createMedicine = async ({
  userId,
  name,
  dosage,
  frequency,
  reminderTimes,
  startDate,
  endDate,
  instructions
}) => {
  const medicines = await getAllMedicines();
  const now = new Date().toISOString();

  const newMedicine = {
    id: `med_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`,
    userId,
    name: name.trim(),
    dosage: dosage.trim(),
    frequency: frequency.trim(),
    reminderTimes: Array.isArray(reminderTimes) ? reminderTimes.map((t) => t.trim()) : [],
    startDate: startDate.trim(),
    endDate: endDate && typeof endDate === 'string' && endDate.trim() ? endDate.trim() : null,
    instructions: instructions && typeof instructions === 'string' && instructions.trim() ? instructions.trim() : null,
    createdAt: now,
    updatedAt: now
  };

  medicines.push(newMedicine);
  await writeJsonFile(MEDICINES_FILE, medicines);

  return newMedicine;
};

/**
 * Updates an existing medicine record after verifying user ownership.
 * Preserves id, userId, and createdAt.
 */
const updateMedicine = async (id, userId, updateData) => {
  const medicines = await getAllMedicines();
  const index = medicines.findIndex((m) => m.id === id);

  if (index === -1 || medicines[index].userId !== userId) {
    return null;
  }

  const existing = medicines[index];
  const now = new Date().toISOString();

  const updatedMedicine = {
    id: existing.id,
    userId: existing.userId,
    name: updateData.name !== undefined ? updateData.name.trim() : existing.name,
    dosage: updateData.dosage !== undefined ? updateData.dosage.trim() : existing.dosage,
    frequency: updateData.frequency !== undefined ? updateData.frequency.trim() : existing.frequency,
    reminderTimes: Array.isArray(updateData.reminderTimes)
      ? updateData.reminderTimes.map((t) => t.trim())
      : existing.reminderTimes,
    startDate: updateData.startDate !== undefined ? updateData.startDate.trim() : existing.startDate,
    endDate: updateData.endDate !== undefined
      ? (updateData.endDate && updateData.endDate.trim() ? updateData.endDate.trim() : null)
      : existing.endDate,
    instructions: updateData.instructions !== undefined
      ? (updateData.instructions && updateData.instructions.trim() ? updateData.instructions.trim() : null)
      : existing.instructions,
    createdAt: existing.createdAt,
    updatedAt: now
  };

  medicines[index] = updatedMedicine;
  await writeJsonFile(MEDICINES_FILE, medicines);

  return updatedMedicine;
};

/**
 * Deletes a medicine by ID after verifying user ownership.
 * Returns the deleted medicine object or null if not found/unauthorized.
 */
const deleteMedicine = async (id, userId) => {
  const medicines = await getAllMedicines();
  const index = medicines.findIndex((m) => m.id === id);

  if (index === -1 || medicines[index].userId !== userId) {
    return null;
  }

  const deletedMedicine = medicines[index];
  medicines.splice(index, 1);
  await writeJsonFile(MEDICINES_FILE, medicines);

  return deletedMedicine;
};

module.exports = {
  getAllMedicines,
  getMedicinesByUserId,
  getMedicineById,
  createMedicine,
  updateMedicine,
  deleteMedicine
};
