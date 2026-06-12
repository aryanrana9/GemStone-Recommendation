const Subscription = require('../models/Subscription');

// @desc    Get user's active subscription status
// @route   GET /api/subscription
// @access  Private
const getSubscription = async (req, res) => {
  try {
    let subscription = await Subscription.findOne({ userId: req.user.id });

    // Fallback/auto-create if missing
    if (!subscription) {
      const expiry = new Date();
      expiry.setFullYear(expiry.getFullYear() + 1);
      subscription = await Subscription.create({
        userId: req.user.id,
        plan: 'Free Plan',
        status: 'active',
        expiryDate: expiry
      });
    }

    res.json({ success: true, subscription });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Simulate upgrading/purchasing subscription plans
// @route   POST /api/subscription/upgrade
// @access  Private
const upgradeSubscription = async (req, res) => {
  try {
    const { plan, paymentMethod } = req.body;
    const validPlans = ['Free Plan', 'Premium Plan', 'Astrology Pro Plan'];

    if (!validPlans.includes(plan)) {
      return res.status(400).json({ success: false, message: 'Invalid plan selected' });
    }

    let subscription = await Subscription.findOne({ userId: req.user.id });

    if (!subscription) {
      subscription = new Subscription({
        userId: req.user.id
      });
    }

    // Cost logic
    let cost = 0;
    if (plan === 'Premium Plan') cost = 29;
    if (plan === 'Astrology Pro Plan') cost = 99;

    const expiry = new Date();
    expiry.setFullYear(expiry.getFullYear() + 1); // 1-year subscription validity

    subscription.plan = plan;
    subscription.status = 'active';
    subscription.expiryDate = expiry;
    
    // Add record to billing log
    subscription.billingHistory.push({
      plan,
      amount: cost,
      date: new Date(),
      paymentMethod: paymentMethod || 'Mock Card',
      status: 'Paid'
    });

    await subscription.save();

    res.json({
      success: true,
      message: `Successfully upgraded to ${plan}!`,
      subscription
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getSubscription,
  upgradeSubscription
};
