const express = require('express')
const router = express.Router()
const Product = require('../models/Product')

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.getAll()
    res.json(products)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Create product
router.post('/', async (req, res) => {
  try {
    // Validate required fields
    const { name, price, quantity } = req.body;
    if (!name || price === undefined) {
      return res.status(400).json({ error: 'Name and price are required' });
    }

    // Prepare product data without ID
    const productData = {
      name,
      description: req.body.description || '',
      price: parseFloat(price),
      quantity: parseInt(quantity || 0)
    };

    const product = await Product.create(productData);
    res.status(201).json(product);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ error: err.message });
  }
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.update(req.params.id, req.body)
    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ error: 'Product not found' })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.delete(req.params.id)
    if (product) {
      res.json({ message: 'Product deleted successfully' })
    } else {
      res.status(404).json({ error: 'Product not found' })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router