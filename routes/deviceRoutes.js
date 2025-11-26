const express = require('express');
const router = express.Router();
const controller = require('../controllers/deviceController');

router.post('/:deviceId', controller.createDevice);
router.put('/:deviceId', controller.updateDevice);
router.delete('/:deviceId', controller.deleteDevice);
router.get('/:deviceId', controller.getDeviceInfo);

router.post('/:deviceId/sync', controller.syncDevice);
router.post('/:deviceId/unsync', controller.unSyncDevice);

router.get('/', controller.listDevices);

module.exports = router;
