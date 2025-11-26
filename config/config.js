require('dotenv').config();

const common = {
  logging: process.env.DB_LOGGING === 'true',
};

const sqlite = (overrides = {}) => ({
  dialect: 'sqlite',
  storage: process.env.SQLITE_STORAGE || './datalogger.sqlite',
  ...common,
  ...overrides,
});

// For future DB engines, read envs: DB_HOST, DB_NAME, DB_USER, DB_PASS
const generic = (overrides = {}) => ({
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || null,
  database: process.env.DB_NAME || 'datalogger',
  host: process.env.DB_HOST || '127.0.0.1',
  dialect: process.env.DB_DIALECT || 'sqlite',
  ...common,
  ...overrides,
});

const byDialect = () => {
  const d = (process.env.DB_DIALECT || 'sqlite').toLowerCase();
  if (d === 'sqlite') return sqlite();
  return generic();
};

module.exports = {
  development: byDialect(),
  test: byDialect(),
  production: byDialect(),
};
