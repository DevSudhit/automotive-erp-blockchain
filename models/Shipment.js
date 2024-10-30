const mongoose = require('mongoose');

const ShipmentSchema = new mongoose.Schema({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Inventory',
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Shipped', 'Delivered']
    },
    trackingNumber: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Shipment', ShipmentSchema);
