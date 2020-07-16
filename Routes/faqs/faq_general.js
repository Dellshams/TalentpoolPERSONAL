/* eslint-disable eol-last */
const express = require('express');
// const faqController = require('../Controllers/faq/faq');
const get_faq = require('../../Controllers/faq/get_faq')
const search_faq = require('../../Controllers/faq/search_faq')
const router = express.Router();

// router.get('/faq', faqController.getAllFaqs);

router.get('/faq',get_faq.get_faq)
router.post('/faq',search_faq.search_faq_post)



module.exports = router;
