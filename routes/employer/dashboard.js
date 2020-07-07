const express = require("express");
const appRoute = express.Router();

const {
    employerDashboard,
    employerProfile,
    employerCreateProfile,
    employerDashboardSettings,
    employerDashboardSupport,
    employerEmployeeGallery,
} = require('../../controllers/employer/dashboard');

appRoute.get('/employer-dashboard', employerDashboard);
appRoute.get('/employer-profile', employerProfile);
appRoute.get('/employer-create-profile', employerCreateProfile);
appRoute.get('/employer-dashboard-settings', employerDashboardSettings);
appRoute.get('/employer-dashboard-support', employerDashboardSupport);
appRoute.get('/employer-employees-gallery', employerEmployeeGallery);


module.exports = appRoute;