const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');

// Get all inventory items
router.get('/', async (req, res) => {
    const items = await Inventory.find();
    res.json(items);
});

// Add new inventory item
router.post('/', async (req, res) => {
    const newItem = new Inventory(req.body);
    await newItem.save();
    res.status(201).json(newItem);
});

module.exports = router;
