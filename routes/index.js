const express = require('express');
const appRoute = express.Router();

const { about, home, directory, faq, contactUs, signOutPopUp, comingSoon } = require('../controllers');
const { logout } = require('../controllers/logout'); 

appRoute.get('/', home);
appRoute.get('/aboutUs', about);
appRoute.get('/contactUs', contactUs);
appRoute.get('/directory', directory);
appRoute.get('/faq', faq);
appRoute.get('/signOutPopUp', signOutPopUp);
appRoute.get('/coming-soon', comingSoon);
appRoute.get('/logout', logout);

module.exports = appRoute;
