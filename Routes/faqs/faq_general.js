/* eslint-disable eol-last */
const express = require('express');
const getFaq = require('../../Controllers/faq/get_faq');
const searchFaq = require('../../Controllers/faq/search_faq');

const router = express.Router();
router.get('/faq', getFaq.get_faq);
router.post('/faq', searchFaq.search_faq_post);
module.exports = router;
