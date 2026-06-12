const Recommendation = require('../models/Recommendation');
const Gemstone = require('../models/Gemstone');
const { runRecommendation } = require('../utils/recommendationEngine');

// @desc    Generate gemstone recommendation and save it
// @route   POST /api/recommendations
// @access  Private
const createRecommendation = async (req, res) => {
  try {
    const {
      fullName,
      gender,
      dob,
      tob,
      pob,
      occupation,
      relationshipStatus,
      careerGoals,
      financialGoals,
      healthConcerns
    } = req.body;

    if (!fullName || !gender || !dob || !tob || !pob) {
      return res.status(400).json({ success: false, message: 'Please provide all required birth details' });
    }

    // Fetch all gemstones from the DB to give the recommendation engine access to the actual content
    const dbGemstones = await Gemstone.find({});
    
    // Execute engine
    const engineOutput = await runRecommendation({
      dob,
      careerGoals,
      financialGoals,
      healthConcerns
    }, dbGemstones);

    // Save recommendation to DB linked to user
    const recommendation = await Recommendation.create({
      userId: req.user.id,
      inputs: {
        fullName,
        gender,
        dob,
        tob,
        pob,
        occupation,
        relationshipStatus,
        careerGoals,
        financialGoals,
        healthConcerns
      },
      recommendedGemstone: engineOutput.recommendedGemstone,
      alternativeGemstones: engineOutput.alternativeGemstones
    });

    res.status(201).json({
      success: true,
      recommendation
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get recommendation history of current user
// @route   GET /api/recommendations
// @access  Private
const getRecommendationHistory = async (req, res) => {
  try {
    const { search, startDate, endDate } = req.query;
    let query = { userId: req.user.id };

    // Date filtering
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    // Retrieve history
    let history = await Recommendation.find(query).sort({ createdAt: -1 });

    // Client-side/Controller-side search filter for user inputs name or recommended gemstone
    if (search) {
      const cleanSearch = search.toLowerCase();
      history = history.filter(item => 
        item.inputs.fullName.toLowerCase().includes(cleanSearch) ||
        item.recommendedGemstone.name.toLowerCase().includes(cleanSearch) ||
        item.recommendedGemstone.planetAssociation.toLowerCase().includes(cleanSearch)
      );
    }

    res.json({ success: true, count: history.length, history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get details of a specific recommendation
// @route   GET /api/recommendations/:id
// @access  Private
const getRecommendationDetails = async (req, res) => {
  try {
    const recommendation = await Recommendation.findById(req.params.id);

    if (!recommendation) {
      return res.status(404).json({ success: false, message: 'Recommendation report not found' });
    }

    // Verify ownership
    if (recommendation.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied: You do not own this report' });
    }

    res.json({ success: true, recommendation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a recommendation
// @route   DELETE /api/recommendations/:id
// @access  Private
const deleteRecommendation = async (req, res) => {
  try {
    const recommendation = await Recommendation.findById(req.params.id);

    if (!recommendation) {
      return res.status(404).json({ success: false, message: 'Recommendation report not found' });
    }

    // Verify ownership
    if (recommendation.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    await recommendation.deleteOne();

    res.json({ success: true, message: 'Recommendation report deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createRecommendation,
  getRecommendationHistory,
  getRecommendationDetails,
  deleteRecommendation
};
