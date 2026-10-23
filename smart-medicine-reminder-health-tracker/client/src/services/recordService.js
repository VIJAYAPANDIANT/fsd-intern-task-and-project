const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const getAuthToken = () => {
  return sessionStorage.getItem('meditrack_token');
};

const fetchWithAuth = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });
  } catch (netErr) {
    throw new Error('Network error: Unable to communicate with backend server.');
  }

  if (response.status === 401) {
    sessionStorage.removeItem('meditrack_token');
    window.dispatchEvent(new CustomEvent('meditrack:auth-expired'));
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Session expired. Please log in again.');
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  return data;
};

/**
 * Retrieves today's scheduled doses and adherence summary for the authenticated user.
 * Automatically generates pending dose records for active medicines on the given date.
 * @param {string} [date] - Optional date in YYYY-MM-DD format
 */
export const getTodaySchedule = async (date) => {
  const query = date ? `?date=${encodeURIComponent(date)}` : '';
  const result = await fetchWithAuth(`/records/today${query}`, { method: 'GET' });
  return result.data;
};

/**
 * Updates status of a medication dose record (Taken, Missed, Pending).
 * @param {string} recordId - Unique record ID
 * @param {'Pending'|'Taken'|'Missed'} status - New status
 */
export const updateRecordStatus = async (recordId, status) => {
  const result = await fetchWithAuth(`/records/${encodeURIComponent(recordId)}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  });
  return result.data;
};

/**
 * Queries historical medication dose logs with optional filtering.
 * @param {object} filters - { date?, status?, startDate?, endDate?, medicineId? }
 */
export const getMedicationHistory = async (filters = {}) => {
  const queryParams = new URLSearchParams();
  if (filters.date) queryParams.append('date', filters.date.trim());
  if (filters.status && filters.status !== 'All') queryParams.append('status', filters.status.trim());
  if (filters.startDate) queryParams.append('startDate', filters.startDate.trim());
  if (filters.endDate) queryParams.append('endDate', filters.endDate.trim());
  if (filters.medicineId) queryParams.append('medicineId', filters.medicineId.trim());

  const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
  const result = await fetchWithAuth(`/records/history${queryString}`, { method: 'GET' });
  return result.data;
};
