const express = require('express');
const router = express.Router();

const Product = require('../models/product');
const Category = require('../models/category');

// POST route to create a new product
// GET route to fetch all products
// GET route to fetch a product by category id
// PUT route to update a product
// DELETE route to delete a product

module.exports = router;