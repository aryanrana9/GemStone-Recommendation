const Gemstone = require('../models/Gemstone');

// @desc    Get all gemstones
// @route   GET /api/gemstones
// @access  Public
const getGemstones = async (req, res) => {
  try {
    const gemstones = await Gemstone.find({});
    res.json({ success: true, count: gemstones.length, gemstones });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single gemstone by name or ID
// @route   GET /api/gemstones/:idOrName
// @access  Public
const getGemstoneDetails = async (req, res) => {
  try {
    const { idOrName } = req.params;
    let gemstone;

    if (idOrName.match(/^[0-9a-fA-Valid]{24}$/i)) {
      gemstone = await Gemstone.findById(idOrName);
    } else {
      // Find by case-insensitive name match
      gemstone = await Gemstone.findOne({ name: { $regex: new RegExp(`^${idOrName}$`, 'i') } });
    }

    if (!gemstone) {
      return res.status(404).json({ success: false, message: 'Gemstone not found' });
    }

    res.json({ success: true, gemstone });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getGemstones,
  getGemstoneDetails
};
