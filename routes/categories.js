const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.getAll();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create category
router.post('/', async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update category
router.put('/:id', async (req, res) => {
    try {
        const category = await Category.update(req.params.id, req.body);
        if (category) {
            res.json(category);
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete category
router.delete('/:id', async (req, res) => {
    try {
        const category = await Category.delete(req.params.id);
        if (category) {
            res.json({ message: 'Category deleted successfully' });
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;