const express = require('express');
const router = express.Router();
const {
  getAnalytics,
  getUsers,
  deleteUser,
  addGemstone,
  updateGemstone,
  deleteGemstone,
  updateHoroscope
} = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.use(protect);
router.use(adminOnly); // Protect all routes in this file for admins only

router.get('/analytics', getAnalytics);
router.get('/users', getUsers);
router.delete('/users/:id', deleteUser);

router.post('/gemstones', addGemstone);
router.put('/gemstones/:id', updateGemstone);
router.delete('/gemstones/:id', deleteGemstone);

router.put('/horoscope/:zodiacSign', updateHoroscope);

module.exports = router;
