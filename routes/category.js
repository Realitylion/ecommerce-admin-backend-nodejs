/*const express = require('express');
const router = express.Router();

const Category = require('../models/category');
const Product = require('../models/product');

// POST route to create a new category
// GET route to fetch all categories
// DELETE route to delete a category

module.exports = router;*/
const express = require('express');
const router = express.Router();
const Category = require('../models/category');

// POST route to create a new category
router.post('/', async (req, res) => {
    const newCategory = new Category(req.body);
    try {
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(400).json({ message: "Error creating category", error: error.message });
    }
});

// GET route to fetch all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching categories', error: err.message });
    }
});

// DELETE route to delete a category by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedCategory = await Category.findOneAndDelete({ categoryId: req.params.id });
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json({ message: 'Category deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting category', error: err.message });
    }
});

module.exports = router;




