"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Devices", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      deviceId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      deviceName: { type: Sequelize.STRING, allowNull: false },
      stationName: { type: Sequelize.STRING, allowNull: false },
      tokenId: { type: Sequelize.STRING },
      rsaPublicKey: { type: Sequelize.TEXT },
      payloadForward: { type: Sequelize.JSON },
      remarks: { type: Sequelize.JSON },
      isSynced: { type: Sequelize.BOOLEAN, defaultValue: false },
      isSyncedTimestamps: { type: Sequelize.JSON, defaultValue: [] },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Devices");
  },
};
