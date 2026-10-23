import { fetchApi } from './apiClient';

/**
 * Retrieves today's scheduled doses and adherence summary for the authenticated user.
 * Automatically generates pending dose records for active medicines on the given date.
 * @param {string} [date] - Optional date in YYYY-MM-DD format
 */
export const getTodaySchedule = async (date) => {
  const query = date ? `?date=${encodeURIComponent(date)}` : '';
  const result = await fetchApi(`/records/today${query}`, { method: 'GET' });
  return result.data;
};

/**
 * Updates status of a medication dose record (Taken, Missed, Pending).
 * @param {string} recordId - Unique record ID
 * @param {'Pending'|'Taken'|'Missed'} status - New status
 */
export const updateRecordStatus = async (recordId, status) => {
  const result = await fetchApi(`/records/${encodeURIComponent(recordId)}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  });
  return result.data;
};

/**
 * Queries historical medication dose logs with optional filtering.
 * @param {object} [filters={}] - { date?, status?, startDate?, endDate?, medicineId? }
 */
export const getMedicationHistory = async (filters = {}) => {
  const queryParams = new URLSearchParams();
  if (filters.date) queryParams.append('date', filters.date.trim());
  if (filters.status && filters.status !== 'All') queryParams.append('status', filters.status.trim());
  if (filters.startDate) queryParams.append('startDate', filters.startDate.trim());
  if (filters.endDate) queryParams.append('endDate', filters.endDate.trim());
  if (filters.medicineId && filters.medicineId !== 'All') queryParams.append('medicineId', filters.medicineId.trim());

  const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
  const result = await fetchApi(`/records/history${queryString}`, { method: 'GET' });
  return result.data;
};
