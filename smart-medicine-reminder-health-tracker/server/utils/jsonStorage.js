const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');
const os = require('os');

// Bundled data directory within the project
const PROJECT_DATA_DIR = path.join(__dirname, '..', 'data');

// In serverless environments like Vercel (AWS Lambda), the deployment bundle (/var/task)
// is strictly read-only (EROFS). The only writable directory is os.tmpdir() (/tmp).
const isServerless = Boolean(
  process.env.VERCEL ||
  process.env.AWS_LAMBDA_FUNCTION_NAME ||
  process.env.LAMBDA_TASK_ROOT
);

// Determine the primary writable directory
let ACTIVE_DATA_DIR = isServerless
  ? path.join(os.tmpdir(), 'meditrack_data')
  : PROJECT_DATA_DIR;

// In-memory cache as an additional safeguard across serverless invocations
const memoryStore = new Map();

// In-memory write queue to serialize writes per file and prevent race conditions
const writeQueues = new Map();

/**
 * Ensures the target data directory exists and is writable.
 * Falls back to os.tmpdir() if PROJECT_DATA_DIR cannot be written to.
 */
const ensureWritableDir = async () => {
  try {
    await fs.mkdir(ACTIVE_DATA_DIR, { recursive: true });
  } catch (err) {
    if (err.code === 'EROFS' || err.code === 'EACCES') {
      ACTIVE_DATA_DIR = path.join(os.tmpdir(), 'meditrack_data');
      await fs.mkdir(ACTIVE_DATA_DIR, { recursive: true });
    } else {
      throw err;
    }
  }
  return ACTIVE_DATA_DIR;
};

/**
 * Safely reads a JSON file.
 * Checks the writable data directory first, then falls back to the bundled project data directory.
 * If the file is corrupted, throws an error WITHOUT silently replacing it.
 *
 * @param {string} fileName - Name of the JSON file (e.g., 'users.json')
 * @param {*} defaultData - Fallback data if file does not exist
 */
const readJsonFile = async (fileName, defaultData = []) => {
  const dir = await ensureWritableDir();
  const writableFilePath = path.join(dir, fileName);
  const bundledFilePath = path.join(PROJECT_DATA_DIR, fileName);

  let rawData = null;

  // 1. Try reading from the active writable directory (e.g. /tmp on Vercel or server/data locally)
  try {
    rawData = await fs.readFile(writableFilePath, 'utf-8');
  } catch (err) {
    if (err.code === 'ENOENT') {
      // 2. If not found in writable directory, check if it exists in bundled project data
      if (bundledFilePath !== writableFilePath) {
        try {
          rawData = await fs.readFile(bundledFilePath, 'utf-8');
          // Copy it into the writable directory for future writes
          try {
            await fs.writeFile(writableFilePath, rawData, 'utf-8');
          } catch (_) {}
        } catch (bundleErr) {
          if (bundleErr.code !== 'ENOENT') throw bundleErr;
        }
      }

      // 3. If neither exists, initialize with defaultData
      if (rawData === null) {
        if (memoryStore.has(fileName)) {
          return memoryStore.get(fileName);
        }
        await writeJsonFile(fileName, defaultData);
        return defaultData;
      }
    } else {
      throw err;
    }
  }

  // Parse file contents
  if (!rawData || !rawData.trim()) {
    return defaultData;
  }

  try {
    const parsed = JSON.parse(rawData);
    memoryStore.set(fileName, parsed);
    return parsed;
  } catch (parseError) {
    throw new Error(`Data corruption error: File "${fileName}" contains invalid or corrupted JSON: ${parseError.message}`);
  }
};

/**
 * Safely writes JSON-serializable data to a file.
 * Uses per-file Promise write queues and atomic rename (temp file -> target file).
 * Compatible with both local environments and serverless Vercel runtimes.
 *
 * @param {string} fileName - Name of the JSON file
 * @param {*} data - Data to persist
 */
const writeJsonFile = async (fileName, data) => {
  // Always update memory store immediately
  memoryStore.set(fileName, data);

  // Queue write operations for this file
  const previousWrite = writeQueues.get(fileName) || Promise.resolve();

  const currentWrite = previousWrite
    .catch(() => {}) // Do not stall queue if previous write threw
    .then(async () => {
      let dir = await ensureWritableDir();
      let filePath = path.join(dir, fileName);
      let tempFilePath = path.join(dir, `.${fileName}.tmp-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`);

      const serialized = JSON.stringify(data, null, 2);

      try {
        await fs.writeFile(tempFilePath, serialized, 'utf-8');
        await fs.rename(tempFilePath, filePath);
      } catch (writeErr) {
        // If write fails due to read-only filesystem (EROFS), switch to /tmp and retry
        if (writeErr.code === 'EROFS' || writeErr.code === 'EACCES') {
          ACTIVE_DATA_DIR = path.join(os.tmpdir(), 'meditrack_data');
          await fs.mkdir(ACTIVE_DATA_DIR, { recursive: true });

          filePath = path.join(ACTIVE_DATA_DIR, fileName);
          tempFilePath = path.join(ACTIVE_DATA_DIR, `.${fileName}.tmp-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`);

          await fs.writeFile(tempFilePath, serialized, 'utf-8');
          await fs.rename(tempFilePath, filePath);
        } else {
          throw writeErr;
        }
      }
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
  writeJsonFile,
  PROJECT_DATA_DIR
};
