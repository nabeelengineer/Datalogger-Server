const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Device = sequelize.define('Device', {
  deviceId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  deviceName: { type: DataTypes.STRING, allowNull: false },
  stationName: { type: DataTypes.STRING, allowNull: false },

  tokenId: { type: DataTypes.STRING },
  rsaPublicKey: { type: DataTypes.TEXT },

  payloadForward: { type: DataTypes.JSON },
  remarks: { type: DataTypes.JSON },

  isSynced: { type: DataTypes.BOOLEAN, defaultValue: false },
  isSyncedTimestamps: { type: DataTypes.JSON, defaultValue: [] },

}, {
  timestamps: true,
});

module.exports = Device;
