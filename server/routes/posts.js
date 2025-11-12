const express = require('express');
const { body } = require('express-validator');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const postController = require('../controllers/postController');
const { protect } = require('../middleware/auth');

// Configure multer for uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
  filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`),
});
const upload = multer({ storage });

// GET /api/posts
router.get('/', postController.getPosts);

// GET /api/posts/:idOrSlug
router.get('/:id', postController.getPost);

// POST /api/posts
router.post(
  '/',
  protect,
  upload.single('featuredImage'),
  [body('title').notEmpty(), body('content').notEmpty(), body('category').notEmpty()],
  postController.createPost
);

// PUT /api/posts/:id
router.put('/:id', protect, upload.single('featuredImage'), postController.updatePost);

// DELETE /api/posts/:id
router.delete('/:id', protect, postController.deletePost);

// POST /api/posts/:postId/comments
router.post('/:postId/comments', protect, [body('content').notEmpty()], postController.addComment);

module.exports = router;
