# Server Data Storage (JSON Storage)

In accordance with project requirements, no external databases (MongoDB, MySQL, PostgreSQL, etc.) are used. All persistence will be maintained using structured JSON files within this directory.

## Storage Files
- `users.json`: Stores user records.
  - **Security Rule**: Passwords must never be stored in plain text. A secure password hash (e.g., bcrypt) will be stored in `passwordHash`.
  - **Privacy Rule**: Password hashes and private sensitive data must never be returned in API responses.
- `medicines.json`: Stores medication schedules (user ID, medicine name, dosage, frequency, reminder times, active status).
- `history.json`: Stores medication intake history and logs (user ID, medicine ID, timestamp, status: Taken, Missed, Pending).

## Concurrency and Safe Access
- Read and write operations should utilize asynchronous file I/O (`fs.promises` or atomic file writes) through the helper in `server/utils/jsonStorage.js`.
