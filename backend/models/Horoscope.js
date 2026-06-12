const mongoose = require('mongoose');

const HoroscopeSchema = new mongoose.Schema({
  zodiacSign: {
    type: String,
    required: true,
    unique: true
  },
  daily: {
    type: String,
    required: true
  },
  weekly: {
    type: String,
    required: true
  },
  monthly: {
    type: String,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Horoscope', HoroscopeSchema);
