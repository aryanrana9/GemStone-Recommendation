const Horoscope = require('../models/Horoscope');

// @desc    Get horoscope for a zodiac sign
// @route   GET /api/horoscope/:zodiacSign
// @access  Public
const getHoroscope = async (req, res) => {
  try {
    const { zodiacSign } = req.params;
    // Find matching sign case-insensitively
    const horoscope = await Horoscope.findOne({
      zodiacSign: { $regex: new RegExp(`^${zodiacSign}$`, 'i') }
    });

    if (!horoscope) {
      return res.status(404).json({ success: false, message: `Horoscope data for ${zodiacSign} not found.` });
    }

    res.json({ success: true, horoscope });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getHoroscope
};
