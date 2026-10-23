import { fetchApi } from './apiClient';

/**
 * Checks backend API health.
 * @returns {Promise<any>}
 */
export const checkHealth = async () => {
  return await fetchApi('/health', { method: 'GET' });
};

/**
 * Registers a new user account.
 * @param {object} userData - { name, email, password }
 * @returns {Promise<{ user: object, token: string }>}
 */
export const registerUser = async (userData) => {
  const result = await fetchApi('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData)
  });
  return result.data;
};

/**
 * Authenticates user credentials.
 * @param {object} credentials - { email, password }
 * @returns {Promise<{ user: object, token: string }>}
 */
export const loginUser = async (credentials) => {
  const result = await fetchApi('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  });
  return result.data;
};

/**
 * Fetches the currently authenticated user's profile.
 * @returns {Promise<{ user: object }>}
 */
export const getMe = async () => {
  const result = await fetchApi('/auth/me', { method: 'GET' });
  return result.data;
};
