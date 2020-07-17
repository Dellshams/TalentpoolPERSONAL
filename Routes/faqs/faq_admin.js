/* eslint-disable eol-last */
const express = require('express');
const deleteFaq = require('../../Controllers/faq/delete_faq');
const getFaq = require('../../Controllers/faq/get_faq');
const updateFaq = require('../../Controllers/faq/update_faq');
const createFaq = require('../../Controllers/faq/create_faq');
const { authorizeAdmin } = require('../../Middleware/admin-auth');

const router = express.Router();

router.post('/faq', authorizeAdmin, createFaq.createFaq);
router.get('/faq', authorizeAdmin, getFaq.get_faq_admin);
router.delete('/faq', authorizeAdmin, deleteFaq.delete_faq);
router.put('/faq', authorizeAdmin, updateFaq.updateFaq);
module.exports = router;
