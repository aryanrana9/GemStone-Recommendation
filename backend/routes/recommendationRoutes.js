const express = require('express');
const router = express.Router();
const {
  createRecommendation,
  getRecommendationHistory,
  getRecommendationDetails,
  deleteRecommendation
} = require('../controllers/recommendationController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // Secure all recommendation routes

router.post('/', createRecommendation);
router.get('/', getRecommendationHistory);
router.get('/:id', getRecommendationDetails);
router.delete('/:id', deleteRecommendation);

module.exports = router;
