const express = require('express');
const Comment = require('../models/Comment');
const auth = require('../middleware/auth');

const router = express.Router();

// Get comments for a blog
router.get('/:blogId', async (req, res) => {
  const comments = await Comment.find({ blog: req.params.blogId }).populate('author', 'username');
  res.json(comments);
});

// Add comment
router.post('/', auth, async (req, res) => {
  const comment = new Comment({ ...req.body, author: req.user.id });
  await comment.save();
  res.status(201).json(comment);
});

// Delete comment
router.delete('/:id', auth, async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) return res.status(404).json({ message: 'Comment not found' });
  if (comment.author.toString() !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ message: 'Not authorized' });
  await comment.remove();
  res.json({ message: 'Comment deleted' });
});

module.exports = router;