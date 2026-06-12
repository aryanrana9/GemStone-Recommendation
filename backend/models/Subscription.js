const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  plan: {
    type: String,
    enum: ['Free Plan', 'Premium Plan', 'Astrology Pro Plan'],
    default: 'Free Plan'
  },
  status: {
    type: String,
    enum: ['active', 'expired', 'cancelled'],
    default: 'active'
  },
  expiryDate: {
    type: Date,
    required: true
  },
  billingHistory: [
    {
      plan: String,
      amount: Number,
      date: { type: Date, default: Date.now },
      paymentMethod: String,
      status: String
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);
