const Post = require('../models/Post');
const Category = require('../models/Category');
const { validationResult } = require('express-validator');

// Get all posts with pagination
exports.getPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const query = {};
    if (req.query.category) query.category = req.query.category;

    const posts = await Post.find(query)
      .populate('author', 'name email')
      .populate('category', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments(query);
    res.json({ posts, page, totalPages: Math.ceil(total / limit), total });
  } catch (err) {
    next(err);
  }
};

// Get single post by id or slug
exports.getPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    let post = null;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      post = await Post.findById(id).populate('author', 'name email').populate('category', 'name');
    }
    if (!post) {
      post = await Post.findOne({ slug: id }).populate('author', 'name email').populate('category', 'name');
    }
    if (!post) return res.status(404).json({ error: 'Post not found' });

    await post.incrementViewCount();
    res.json(post);
  } catch (err) {
    next(err);
  }
};

// Create post
exports.createPost = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { title, content, excerpt, category, tags, isPublished } = req.body;
    // ensure category exists
    const cat = await Category.findById(category);
    if (!cat) return res.status(400).json({ error: 'Invalid category' });

    const post = await Post.create({
      title,
      content,
      excerpt,
      category: cat._id,
      tags: tags ? (Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim())) : [],
      isPublished: !!isPublished,
      author: req.user ? req.user._id : undefined,
      featuredImage: req.file ? `/uploads/${req.file.filename}` : undefined,
    });

    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

// Update post
exports.updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    // Basic ownership/admin check could be added here
    const updates = req.body;
    if (req.file) updates.featuredImage = `/uploads/${req.file.filename}`;

    Object.assign(post, updates);
    await post.save();
    res.json(post);
  } catch (err) {
    next(err);
  }
};

// Delete post
exports.deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    await post.remove();
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

// Add comment
exports.addComment = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    await post.addComment(req.user ? req.user._id : null, content);
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};
