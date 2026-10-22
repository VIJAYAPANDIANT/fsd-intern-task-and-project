const { readJsonFile, writeJsonFile } = require('../utils/jsonStorage');
const crypto = require('crypto');

const USERS_FILE = 'users.json';

/**
 * Returns a sanitized user object without sensitive fields (passwordHash).
 */
const sanitizeUser = (user) => {
  if (!user) return null;
  const { passwordHash, ...safeUser } = user;
  return safeUser;
};

/**
 * Finds all users stored in users.json.
 */
const getAllUsers = async () => {
  return await readJsonFile(USERS_FILE, []);
};

/**
 * Finds a user by email (case-insensitive).
 */
const findUserByEmail = async (email) => {
  if (!email) return null;
  const users = await getAllUsers();
  const normalizedEmail = email.trim().toLowerCase();
  return users.find((u) => u.email.toLowerCase() === normalizedEmail) || null;
};

/**
 * Finds a user by unique ID.
 */
const findUserById = async (id) => {
  if (!id) return null;
  const users = await getAllUsers();
  return users.find((u) => u.id === id) || null;
};

/**
 * Creates and stores a new user record.
 */
const createUser = async ({ name, email, passwordHash }) => {
  const users = await getAllUsers();
  const normalizedEmail = email.trim().toLowerCase();

  const newUser = {
    id: `usr_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`,
    name: name.trim(),
    email: normalizedEmail,
    passwordHash,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  await writeJsonFile(USERS_FILE, users);

  return sanitizeUser(newUser);
};

module.exports = {
  sanitizeUser,
  getAllUsers,
  findUserByEmail,
  findUserById,
  createUser
};
