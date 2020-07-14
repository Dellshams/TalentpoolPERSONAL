const express = require('express');

const appRoute = express.Router();


const {
    adminMessagePage
} = require('../../../Controllers/views/message/message');
const {
    employerMessagePage
} = require('../../../Controllers/views/message/message');
const {
    employeeMessagePage
} = require('../../../Controllers/views/message/message');


appRoute.get('/admin/message', adminMessagePage);
appRoute.get('/employer/message', employerMessagePage);
appRoute.get('/employee/message', employeeMessagePage);

module.exports = appRoute;