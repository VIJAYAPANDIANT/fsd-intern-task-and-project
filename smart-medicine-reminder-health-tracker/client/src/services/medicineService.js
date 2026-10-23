const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Retrieves the stored JWT from sessionStorage.
 */
const getAuthToken = () => {
  return sessionStorage.getItem('meditrack_token');
};

/**
 * Common fetch wrapper that injects Authorization header,
 * handles HTTP status codes, and emits session expiration events on 401.
 */
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
    throw new Error('Network error: Unable to communicate with backend server. Please verify the API is running.');
  }

  // Handle unauthorized / session expiration
  if (response.status === 401) {
    sessionStorage.removeItem('meditrack_token');
    window.dispatchEvent(new CustomEvent('meditrack:auth-expired'));
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Session expired or unauthorized. Please log in again.');
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  return data;
};

/**
 * Retrieves all medicines for the authenticated user, with optional filters.
 * @param {object} filters - { name?: string, frequency?: string }
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
  const result = await fetchWithAuth(`/medicines${queryString}`, { method: 'GET' });
  return result.data;
};

/**
 * Retrieves a single medicine by its ID.
 * @param {string} id - Medicine ID
 */
export const getMedicineById = async (id) => {
  const result = await fetchWithAuth(`/medicines/${encodeURIComponent(id)}`, { method: 'GET' });
  return result.data;
};

/**
 * Creates a new medicine prescription for the authenticated user.
 * @param {object} medicineData - { name, dosage, frequency, reminderTimes, startDate, endDate?, instructions? }
 */
export const createMedicine = async (medicineData) => {
  const result = await fetchWithAuth('/medicines', {
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
  const result = await fetchWithAuth(`/medicines/${encodeURIComponent(id)}`, {
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
  const result = await fetchWithAuth(`/medicines/${encodeURIComponent(id)}`, {
    method: 'DELETE'
  });
  return result.data;
};
