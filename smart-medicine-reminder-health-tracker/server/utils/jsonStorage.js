const fs = require('fs').promises;
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');

/**
 * Safely reads a JSON file from the data directory.
 * Returns defaultData if the file does not exist or is empty.
 * @param {string} fileName - Name of the JSON file (e.g., 'users.json')
 * @param {*} defaultData - Fallback data if file is missing/empty
 */
const readJsonFile = async (fileName, defaultData = []) => {
  const filePath = path.join(DATA_DIR, fileName);
  try {
    const rawData = await fs.readFile(filePath, 'utf-8');
    if (!rawData.trim()) return defaultData;
    return JSON.parse(rawData);
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
 * @param {string} fileName - Name of the JSON file
 * @param {*} data - Data to persist
 */
const writeJsonFile = async (fileName, data) => {
  const filePath = path.join(DATA_DIR, fileName);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

module.exports = {
  readJsonFile,
  writeJsonFile
};
