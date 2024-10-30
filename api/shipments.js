const express = require('express');
const router = express.Router();
const Shipment = require('../models/Shipment');

// Get all shipments
router.get('/', async (req, res) => {
    const shipments = await Shipment.find();
    res.json(shipments);
});

// Create a new shipment
router.post('/', async (req, res) => {
    const newShipment = new Shipment(req.body);
    await newShipment.save();
    res.status(201).json(newShipment);
});

module.exports = router;
