const express = require('express');
const router = express.Router();
const { getGemstones, getGemstoneDetails } = require('../controllers/gemstoneController');

router.get('/', getGemstones);
router.get('/:idOrName', getGemstoneDetails);

module.exports = router;
