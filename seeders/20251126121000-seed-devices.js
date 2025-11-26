"use strict";

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    await queryInterface.bulkInsert("Devices", [
      {
        deviceId: "DL-LOCAL-001",
        deviceName: "Local Logger 1",
        stationName: "Station-A",
        tokenId: "token-A",
        rsaPublicKey: null,
        payloadForward: JSON.stringify({ BOD: 25.5, COD: 60, TSS: 87, pH: 7.7 }),
        remarks: JSON.stringify({ remark_code: "OK" }),
        isSynced: false,
        isSyncedTimestamps: JSON.stringify([]),
        createdAt: now,
        updatedAt: now,
      },
      {
        deviceId: "DL-LOCAL-002",
        deviceName: "Local Logger 2",
        stationName: "Station-B",
        tokenId: "token-B",
        rsaPublicKey: null,
        payloadForward: JSON.stringify({ temperature: 26.1, humidity: 58 }),
        remarks: JSON.stringify({ remark_code: "WARN" }),
        isSynced: true,
        isSyncedTimestamps: JSON.stringify([now.toISOString()]),
        createdAt: now,
        updatedAt: now,
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Devices", null, {});
  },
};
