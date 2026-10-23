/**
 * Centralized API Client
 * Single source of truth for backend communication, base URL resolution,
 * JWT authentication injection, and standardized error parsing.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Retrieves the stored JWT authentication token from sessionStorage.
 */
export const getAuthToken = () => {
  return sessionStorage.getItem('meditrack_token');
};

/**
 * Persists or clears the JWT authentication token in sessionStorage.
 * @param {string|null} token 
 */
export const setAuthToken = (token) => {
  if (token) {
    sessionStorage.setItem('meditrack_token', token);
  } else {
    sessionStorage.removeItem('meditrack_token');
  }
};

/**
 * Clears the stored authentication token.
 */
export const clearAuthToken = () => {
  sessionStorage.removeItem('meditrack_token');
};

/**
 * Universal fetch wrapper for all frontend API calls.
 * - Injects Bearer token from sessionStorage if present.
 * - Sets default Content-Type to application/json.
 * - Emits 'meditrack:auth-expired' CustomEvent on 401 Unauthorized.
 * - Normalizes network failures into clear Error objects.
 * - Parses backend error JSON response.
 *
 * @param {string} endpoint - API path (e.g., '/auth/login', '/medicines')
 * @param {RequestInit} [options={}] - Standard fetch options
 * @returns {Promise<any>} Parsed JSON response payload
 */
export const fetchApi = async (endpoint, options = {}) => {
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
    throw new Error('Network error: Unable to communicate with the backend server. Please verify the API is running.');
  }

  // Handle unauthorized / session expiration
  if (response.status === 401) {
    clearAuthToken();
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

export { API_BASE_URL };
