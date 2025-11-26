const { Sequelize } = require('sequelize');
require('dotenv').config();

const DIALECT = (process.env.DB_DIALECT || 'sqlite').toLowerCase();

let sequelize;
if (DIALECT === 'sqlite') {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.SQLITE_STORAGE || './datalogger.sqlite',
    logging: process.env.DB_LOGGING === 'true',
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME || 'datalogger',
    process.env.DB_USER || 'root',
    process.env.DB_PASS || null,
    {
      host: process.env.DB_HOST || '127.0.0.1',
      dialect: DIALECT,
      logging: process.env.DB_LOGGING === 'true',
    }
  );
}

module.exports = sequelize;
