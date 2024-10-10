/*const express = require('express');
const router = express.Router();

const Product = require('../models/product');
const Category = require('../models/category');

// POST route to create a new product
// GET route to fetch all products
// GET route to fetch a product by category id
// PUT route to update a product
// DELETE route to delete a product

module.exports = router;*/
const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Category = require('../models/category');
const { parse } = require('dotenv');

// POST route to create a new product
router.post('/', async (req, res) => {
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: "Error creating product", error: error.message });
    }
});


// GET route to fetch all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error("Error fetching products", error);
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
});

// GET route to fetch products by category ID
router.get('/category/:categoryId', async (req, res) => {
    try {
        // categoryId = parseInt(req.params.categoryId);
        const products = await Product.find({ categoryId: req.params.categoryId });
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found for this category' });
        }
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching products', error: err.message });
    }
});

// PUT route to update a product by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findOneAndUpdate(
            { productId: req.params.id },
            {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                category: req.body.categoryId,
            },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: 'Error updating product', error: err.message });
    }
});

// DELETE route to delete a product by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findOneAndDelete({ productId: req.params.id} );
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting product', error: err.message });
    }
});

module.exports = router;
