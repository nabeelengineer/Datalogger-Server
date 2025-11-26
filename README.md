# Datalogger Server

A simple Express + Sequelize API for managing datalogger devices. Uses SQLite by default. Supports CRUD, sync/unsync, RSA key masking, and Postman collection for testing.

## Features
- Client-provided `deviceId` (set in URL)
- Fields: `deviceName`, `stationName`, `tokenId`, `rsaPublicKey`, `payloadForward` (JSON), `remarks` (JSON), `isSynced`, `isSyncedTimestamps` (array)
- RSA key is masked in responses: `rsaPublicKey` returns `1` if present otherwise `0`
- Sync sets `isSynced=true` and appends timestamp; optional `payload` updates `payloadForward`

## Requirements
- Node.js 18+

## Setup
1. Install dependencies
```
npm install
```
2. Configure environment (already provided as `.env`)
```
PORT=3000
DB_DIALECT=sqlite
SQLITE_STORAGE=./datalogger.sqlite
DB_LOGGING=false
```

## Database (migrations & seeders)
- Migrate schema
```
npm run migrate
```
- Undo last migration
```
npm run db:migrate:undo
```
- Seed sample data (optional)
```
npm run seed
```
- Undo all seeds
```
npm run db:seed:undo
```

Note: Prefer migrations over runtime `sequelize.sync()`. If you keep `sequelize.sync()` in `server.js`, it may diverge from migration-managed schema.

## Run the server
```
npm run dev
```
Server will start at `http://localhost:3000`.

## API Endpoints
Base path: `/devices`

- Create device (client provides deviceId)
  - POST `/devices/:deviceId`
  - Body (JSON): `deviceName`, `stationName`, `tokenId`, `rsaPublicKey`, optional `payloadForward`, optional `remarks`

- Get device info
  - GET `/devices/:deviceId`

- Update device
  - PUT `/devices/:deviceId`
  - Body: include only fields to update

- Delete device
  - DELETE `/devices/:deviceId`

- List devices
  - GET `/devices`

- Sync device (set isSynced TRUE, append timestamp)
  - POST `/devices/:deviceId/sync`
  - Optional Body: `{ "payload": { ... } }` → replaces `payloadForward` with provided payload

- Unsync device (set isSynced FALSE)
  - POST `/devices/:deviceId/unsync`

## Testing with Postman
- Import `Datalogger.postman_collection.json`
- Set collection variable `deviceId` (e.g., `ENE001`)
- Run requests in order: Create → Get/List → Sync → Unsync → Update → Delete

## Notes
- `payloadForward` represents the latest payload to forward/log; sync with a payload will overwrite it
- `isSyncedTimestamps` keeps the last 7 sync timestamps
