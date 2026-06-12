const express = require('express');
const router = express.Router();
const { getHoroscope } = require('../controllers/horoscopeController');

router.get('/:zodiacSign', getHoroscope);

module.exports = router;
