const User = require('../models/User');
const Subscription = require('../models/Subscription');
const jwt = require('jsonwebtoken');

// Helper function to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'dev_secret_key_astrogem_2026', {
    expiresIn: '30d'
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, birthDetails } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Assign admin role if email is 'admin@astrogem.com'
    const role = email === 'admin@astrogem.com' ? 'admin' : 'user';

    const user = await User.create({
      name,
      email,
      password,
      birthDetails: birthDetails || { dob: '', tob: '', pob: '', gender: '' },
      role
    });

    if (user) {
      // Create a default subscription for the user
      const expiry = new Date();
      expiry.setFullYear(expiry.getFullYear() + 1); // 1 year default free plan

      await Subscription.create({
        userId: user._id,
        plan: 'Free Plan',
        status: 'active',
        expiryDate: expiry
      });

      res.status(201).json({
        success: true,
        token: generateToken(user._id),
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          birthDetails: user.birthDetails,
          role: user.role,
          profileImage: user.profileImage
        }
      });
    } else {
      res.status(400).json({ success: false, message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
      res.json({
        success: true,
        token: generateToken(user._id),
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          birthDetails: user.birthDetails,
          role: user.role,
          profileImage: user.profileImage
        }
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      res.json({ success: true, user });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.profileImage = req.body.profileImage !== undefined ? req.body.profileImage : user.profileImage;
      
      if (req.body.birthDetails) {
        user.birthDetails = {
          dob: req.body.birthDetails.dob !== undefined ? req.body.birthDetails.dob : user.birthDetails.dob,
          tob: req.body.birthDetails.tob !== undefined ? req.body.birthDetails.tob : user.birthDetails.tob,
          pob: req.body.birthDetails.pob !== undefined ? req.body.birthDetails.pob : user.birthDetails.pob,
          gender: req.body.birthDetails.gender !== undefined ? req.body.birthDetails.gender : user.birthDetails.gender
        };
      }

      const updatedUser = await user.save();

      res.json({
        success: true,
        user: {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          birthDetails: updatedUser.birthDetails,
          role: updatedUser.role,
          profileImage: updatedUser.profileImage
        }
      });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id).select('+password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (!(await user.matchPassword(currentPassword))) {
      return res.status(400).json({ success: false, message: 'Incorrect current password' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Forgot password simulation
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'No user registered with this email' });
    }

    // Since this is a simulation, we will return a mock reset link
    res.json({
      success: true,
      message: `A simulated password reset instructions has been sent to ${email}.`,
      resetLink: `/reset-password/simulated-${user._id}`
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  changePassword,
  forgotPassword
};
