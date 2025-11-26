const { v4: uuidv4 } = require('uuid');
const Device = require('../models/Device');
const { addSyncTimestamp } = require('../utils/timestamp');

const maskDevice = (device) => {
  const plain = device?.toJSON ? device.toJSON() : device;
  return {
    ...plain,
    rsaPublicKey: plain?.rsaPublicKey ? 1 : 0,
  };
};


// ------------------------ CREATE DEVICE ------------------------
exports.createDevice = async (req, res) => {
  try {
    const { deviceName, stationName, tokenId, rsaPublicKey, payloadForward, remarks } = req.body;
    const { deviceId } = req.params;

    if (!deviceId || !deviceName || !stationName) {
      return res.status(400).json({ error: "deviceId (in URL), deviceName and stationName required" });
    }

    const exists = await Device.findOne({ where: { deviceId } });
    if (exists) {
      return res.status(409).json({ error: "Device with this deviceId already exists" });
    }

    const device = await Device.create({
      deviceId,
      deviceName,
      stationName,
      tokenId,
      rsaPublicKey,
      payloadForward: payloadForward || {},
      remarks: remarks || {},
      isSynced: false,
      isSyncedTimestamps: []
    });

    res.status(201).json({ message: "Device created", device: maskDevice(device) });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ------------------------ UPDATE DEVICE ------------------------
exports.updateDevice = async (req, res) => {
  try {
    const { deviceId } = req.params;
    const updates = req.body;

    delete updates.deviceId;

    const device = await Device.findOne({ where: { deviceId } });
    if (!device) return res.status(404).json({ error: "Device not found" });

    await device.update(updates);
    res.json({ message: "Device updated", device: maskDevice(device) });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ------------------------ DELETE DEVICE ------------------------
exports.deleteDevice = async (req, res) => {
  try {
    const { deviceId } = req.params;

    const device = await Device.findOne({ where: { deviceId } });
    if (!device) return res.status(404).json({ error: "Device not found" });

    await device.destroy();
    res.json({ message: "Device deleted" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ------------------------ FETCH DEVICE INFO ------------------------
exports.getDeviceInfo = async (req, res) => {
  try {
    const { deviceId } = req.params;
    const device = await Device.findOne({ where: { deviceId } });

    if (!device) return res.status(404).json({ error: "Device not found" });

    res.json({ device: maskDevice(device) });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ------------------------ DEVICE SYNC API ------------------------
exports.syncDevice = async (req, res) => {
  try {
    const { deviceId } = req.params;

    const device = await Device.findOne({ where: { deviceId } });
    if (!device) return res.status(404).json({ error: "Device not found" });

    device.isSynced = true;
    device.isSyncedTimestamps = addSyncTimestamp(device.isSyncedTimestamps, 7);

    if (req.body.payload) device.payloadForward = req.body.payload;

    await device.save();

    res.json({ message: "Device synced", device: maskDevice(device) });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ------------------------ UNSYNC DEVICE ------------------------
exports.unSyncDevice = async (req, res) => {
  try {
    const { deviceId } = req.params;

    const device = await Device.findOne({ where: { deviceId } });
    if (!device) return res.status(404).json({ error: "Device not found" });

    device.isSynced = false;
    await device.save();

    res.json({ message: "Device marked unsynced", device: maskDevice(device) });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ------------------------ LIST ALL DEVICES ------------------------
exports.listDevices = async (req, res) => {
  try {
    const devices = await Device.findAll();
    res.json({ devices: devices.map(maskDevice) });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
