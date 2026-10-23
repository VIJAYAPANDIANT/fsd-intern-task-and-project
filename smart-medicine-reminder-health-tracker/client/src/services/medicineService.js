import { fetchApi } from './apiClient';

/**
 * Retrieves all medicines for the authenticated user, with optional filters.
 * @param {object} [filters={}] - { name?: string, frequency?: string }
 */
export const getMedicines = async (filters = {}) => {
  const queryParams = new URLSearchParams();
  if (filters.name && filters.name.trim()) {
    queryParams.append('name', filters.name.trim());
  }
  if (filters.frequency && filters.frequency.trim()) {
    queryParams.append('frequency', filters.frequency.trim());
  }

  const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
  const result = await fetchApi(`/medicines${queryString}`, { method: 'GET' });
  return result.data;
};

/**
 * Retrieves a single medicine by its ID.
 * @param {string} id - Medicine ID
 */
export const getMedicineById = async (id) => {
  const result = await fetchApi(`/medicines/${encodeURIComponent(id)}`, { method: 'GET' });
  return result.data;
};

/**
 * Creates a new medicine prescription for the authenticated user.
 * @param {object} medicineData - { name, dosage, frequency, reminderTimes, startDate, endDate?, instructions? }
 */
export const createMedicine = async (medicineData) => {
  const result = await fetchApi('/medicines', {
    method: 'POST',
    body: JSON.stringify(medicineData)
  });
  return result.data;
};

/**
 * Updates an existing medicine prescription owned by the authenticated user.
 * @param {string} id - Medicine ID
 * @param {object} medicineData - Fields to update
 */
export const updateMedicine = async (id, medicineData) => {
  const result = await fetchApi(`/medicines/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(medicineData)
  });
  return result.data;
};

/**
 * Deletes a medicine prescription owned by the authenticated user.
 * @param {string} id - Medicine ID
 */
export const deleteMedicine = async (id) => {
  const result = await fetchApi(`/medicines/${encodeURIComponent(id)}`, {
    method: 'DELETE'
  });
  return result.data;
};
