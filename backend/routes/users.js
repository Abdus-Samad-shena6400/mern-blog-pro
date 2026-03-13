const express = require('express');
const User = require('../models/User');
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});

// Admin dashboard
router.get('/admin', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Not authorized' });
  const users = await User.find().select('-password');
  const blogs = await Blog.find().populate('author', 'username');
  res.json({ users, blogs });
});

module.exports = router;