const User = require('../models/User');
const Gemstone = require('../models/Gemstone');
const Horoscope = require('../models/Horoscope');
const Recommendation = require('../models/Recommendation');

// @desc    Get dashboard analytics
// @route   GET /api/admin/analytics
// @access  Private/Admin
const getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalRecommendations = await Recommendation.countDocuments({});
    
    // Aggregation to find the most recommended gemstone
    const gemStats = await Recommendation.aggregate([
      { $group: { _id: '$recommendedGemstone.name', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]);
    
    const mostRecommendedGemstone = gemStats.length > 0 ? gemStats[0]._id : 'None';
    
    // Active users: users who have generated at least 1 recommendation report
    const activeUsers = await Recommendation.distinct('userId');
    const totalActiveUsers = activeUsers.length;

    res.json({
      success: true,
      analytics: {
        totalUsers,
        totalRecommendations,
        mostRecommendedGemstone,
        totalActiveUsers
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all users list
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    res.json({ success: true, count: users.length, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.role === 'admin') {
      return res.status(400).json({ success: false, message: 'Cannot delete admin user' });
    }

    await user.deleteOne();
    res.json({ success: true, message: 'User profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add a new gemstone
// @route   POST /api/admin/gemstones
// @access  Private/Admin
const addGemstone = async (req, res) => {
  try {
    const gemstone = await Gemstone.create(req.body);
    res.status(201).json({ success: true, gemstone });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a gemstone
// @route   PUT /api/admin/gemstones/:id
// @access  Private/Admin
const updateGemstone = async (req, res) => {
  try {
    const gemstone = await Gemstone.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!gemstone) {
      return res.status(404).json({ success: false, message: 'Gemstone not found' });
    }

    res.json({ success: true, gemstone });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a gemstone
// @route   DELETE /api/admin/gemstones/:id
// @access  Private/Admin
const deleteGemstone = async (req, res) => {
  try {
    const gemstone = await Gemstone.findById(req.params.id);

    if (!gemstone) {
      return res.status(404).json({ success: false, message: 'Gemstone not found' });
    }

    await gemstone.deleteOne();
    res.json({ success: true, message: 'Gemstone deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update horoscope details
// @route   PUT /api/admin/horoscope/:zodiacSign
// @access  Private/Admin
const updateHoroscope = async (req, res) => {
  try {
    const { zodiacSign } = req.params;
    const { daily, weekly, monthly } = req.body;

    let horoscope = await Horoscope.findOne({
      zodiacSign: { $regex: new RegExp(`^${zodiacSign}$`, 'i') }
    });

    if (horoscope) {
      horoscope.daily = daily || horoscope.daily;
      horoscope.weekly = weekly || horoscope.weekly;
      horoscope.monthly = monthly || horoscope.monthly;
      horoscope.updatedAt = new Date();
      await horoscope.save();
    } else {
      horoscope = await Horoscope.create({
        zodiacSign,
        daily,
        weekly,
        monthly
      });
    }

    res.json({ success: true, horoscope });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAnalytics,
  getUsers,
  deleteUser,
  addGemstone,
  updateGemstone,
  deleteGemstone,
  updateHoroscope
};
