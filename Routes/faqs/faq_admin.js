/* eslint-disable eol-last */
const express = require('express');
const  delete_faq  = require('../../Controllers/faq/delete_faq')
const get_faq = require('../../Controllers/faq/get_faq')
const search_faq = require('../../Controllers/faq/search_faq')
const update_faq = require('../../Controllers/faq/update_faq')
const create_faq = require('../../Controllers/faq/create_faq')
const { authorizeAdmin } = require('../../Middleware/admin-auth');
// const Role = require('../Middleware/role');
const router = express.Router();
// Create FAQ
// router.post('/faq', faqController.createfaq);
// View all FAQs
// router.get('/faq', faqController.getAllFaqs);
// Get FAQ By ID
// router.get('/faq/:id', faqController.getfaq);
// Update FAQs
// router.patch('/faq/:id', faqController.updateFaq);
router.post('/faq',authorizeAdmin,create_faq.createFaq)
router.get('/faq',authorizeAdmin,get_faq.get_faq_admin)
router.delete('/faq',authorizeAdmin,delete_faq.delete_faq)
router.put('/faq',authorizeAdmin,update_faq.updateFaq)
// router.get('/delete/faq',delete_faq.delete_before)
// router.get('/search/faq',search_faq.search_faq_get)
// router.post('/faq',search_faq.search_faq_post)

module.exports = router;
