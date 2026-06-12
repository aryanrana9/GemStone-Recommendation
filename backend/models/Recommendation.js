const mongoose = require('mongoose');

const RecommendationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  inputs: {
    fullName: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: String, required: true },
    tob: { type: String, required: true },
    pob: { type: String, required: true },
    occupation: { type: String, default: '' },
    relationshipStatus: { type: String, default: '' },
    careerGoals: { type: String, default: '' },
    financialGoals: { type: String, default: '' },
    healthConcerns: { type: String, default: '' }
  },
  recommendedGemstone: {
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    benefits: { type: [String], default: [] },
    planetAssociation: { type: String, required: true },
    zodiacCompatibility: { type: [String], default: [] },
    wearingMethod: { type: String, required: true },
    recommendedMetal: { type: String, required: true },
    recommendedFinger: { type: String, required: true },
    recommendedDay: { type: String, required: true },
    confidenceScore: { type: Number, required: true }
  },
  alternativeGemstones: [
    {
      name: { type: String, required: true },
      image: { type: String, required: true },
      description: { type: String, required: true },
      planetAssociation: { type: String, required: true }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Recommendation', RecommendationSchema);
