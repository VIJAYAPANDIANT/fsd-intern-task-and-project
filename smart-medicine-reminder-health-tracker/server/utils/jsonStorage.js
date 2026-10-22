const fs = require('fs').promises;
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');

// Simple in-memory queue to serialize writes per file and prevent concurrent file corruption
const writeQueues = new Map();

/**
 * Safely reads a JSON file from the data directory.
 * If the file does not exist, it creates it with defaultData ([]).
 * If the file is corrupted/unreadable, throws an error WITHOUT overwriting data.
 * 
 * @param {string} fileName - Name of the JSON file (e.g., 'users.json')
 * @param {*} defaultData - Fallback data only when file does not exist
 */
const readJsonFile = async (fileName, defaultData = []) => {
  const filePath = path.join(DATA_DIR, fileName);
  try {
    const rawData = await fs.readFile(filePath, 'utf-8');
    if (!rawData.trim()) {
      return defaultData;
    }
    try {
      return JSON.parse(rawData);
    } catch (parseError) {
      // DO NOT silently overwrite corrupted user data with an empty array!
      throw new Error(`Data corruption error: File "${fileName}" contains invalid or corrupted JSON: ${parseError.message}`);
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      await writeJsonFile(fileName, defaultData);
      return defaultData;
    }
    throw err;
  }
};

/**
 * Safely writes JSON-serializable data to a file in the data directory.
 * Uses write queuing and atomic rename (temp file -> target file) to prevent corruption.
 * 
 * @param {string} fileName - Name of the JSON file
 * @param {*} data - Data to persist
 */
const writeJsonFile = async (fileName, data) => {
  const filePath = path.join(DATA_DIR, fileName);
  const tempFilePath = path.join(DATA_DIR, `.${fileName}.tmp-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`);

  // Queue write operations for this file
  const previousWrite = writeQueues.get(fileName) || Promise.resolve();

  const currentWrite = previousWrite
    .catch(() => {}) // Do not fail the queue if previous write failed
    .then(async () => {
      // Ensure DATA_DIR exists
      await fs.mkdir(DATA_DIR, { recursive: true });

      const serialized = JSON.stringify(data, null, 2);
      // Write to temp file first
      await fs.writeFile(tempFilePath, serialized, 'utf-8');
      // Atomic rename to final path
      await fs.rename(tempFilePath, filePath);
    })
    .finally(() => {
      if (writeQueues.get(fileName) === currentWrite) {
        writeQueues.delete(fileName);
      }
    });

  writeQueues.set(fileName, currentWrite);
  return currentWrite;
};

module.exports = {
  readJsonFile,
  writeJsonFile
};
