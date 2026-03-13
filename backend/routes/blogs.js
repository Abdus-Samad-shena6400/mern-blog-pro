const express = require('express');
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// Get all blogs
router.get('/', async (req, res) => {
  const { search, category, page = 1, limit = 10 } = req.query;
  const query = {};
  if (search) query.title = { $regex: search, $options: 'i' };
  if (category) query.category = category;
  const blogs = await Blog.find(query).populate('author', 'username').sort({ createdAt: -1 }).limit(limit * 1).skip((page - 1) * limit);
  res.json(blogs);
});

// Get single blog
router.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('author', 'username');
  if (!blog) return res.status(404).json({ message: 'Blog not found' });
  res.json(blog);
});

// Create blog
router.post('/', auth, upload.single('image'), async (req, res) => {
  const blog = new Blog({ ...req.body, author: req.user.id, image: req.file ? req.file.path : undefined });
  await blog.save();
  res.status(201).json(blog);
});

// Update blog
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: 'Blog not found' });
  if (blog.author.toString() !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ message: 'Not authorized' });
  Object.assign(blog, req.body);
  if (req.file) blog.image = req.file.path;
  await blog.save();
  res.json(blog);
});

// Delete blog
router.delete('/:id', auth, async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: 'Blog not found' });
  if (blog.author.toString() !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ message: 'Not authorized' });
  await blog.remove();
  res.json({ message: 'Blog deleted' });
});

// Like blog
router.post('/:id/like', auth, async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: 'Blog not found' });
  const index = blog.likes.indexOf(req.user.id);
  if (index > -1) {
    blog.likes.splice(index, 1);
  } else {
    blog.likes.push(req.user.id);
  }
  await blog.save();
  res.json(blog);
});

module.exports = router;