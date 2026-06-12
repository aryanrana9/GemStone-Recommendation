const express = require('express');
const router = express.Router();
const { getSubscription, upgradeSubscription } = require('../controllers/subscriptionController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // Secure all subscription routes

router.get('/', getSubscription);
router.post('/upgrade', upgradeSubscription);

module.exports = router;
