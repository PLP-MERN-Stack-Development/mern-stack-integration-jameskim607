const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { protect, admin } = require('../middleware/auth');

// GET /api/categories
router.get('/', categoryController.getCategories);

// POST /api/categories (protected)
router.post('/', protect, admin, [body('name').notEmpty()], categoryController.createCategory);

module.exports = router;
