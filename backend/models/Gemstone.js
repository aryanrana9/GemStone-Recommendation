const mongoose = require('mongoose');

const GemstoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a gemstone name'],
    unique: true
  },
  image: {
    type: String,
    required: [true, 'Please add an image url or path']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  benefits: {
    type: [String],
    default: []
  },
  zodiacCompatibility: {
    type: [String],
    default: []
  },
  planetAssociation: {
    type: String,
    required: [true, 'Please add a ruling planet']
  },
  wearingMethod: {
    type: String,
    required: [true, 'Please add the wearing process or method']
  },
  recommendedMetal: {
    type: String,
    required: [true, 'Please specify the recommended metal']
  },
  recommendedFinger: {
    type: String,
    required: [true, 'Please specify the recommended finger']
  },
  recommendedDay: {
    type: String,
    required: [true, 'Please specify the wearing day']
  },
  careInstructions: {
    type: String,
    default: 'Clean with warm soapy water and a soft cloth. Avoid harsh chemicals.'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Gemstone', GemstoneSchema);
