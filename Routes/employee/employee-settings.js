const express = require('express');
const {
  createSupport,
  notificationSettings,
} = require('../../controllers/employee/employee-settings');

const router = express.Router();
router.post('/support', createSupport).patch('/notifications', notificationSettings);

module.exports = router;