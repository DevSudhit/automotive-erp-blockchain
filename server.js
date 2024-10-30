const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(bodyParser.json());

// Serve static files from the frontend/public directory
app.use(express.static(path.join(__dirname, 'public'))); 

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/automotive_erp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define Item and Shipment schemas
const itemSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    quantity: { type: Number, required: true }, 
});

const shipmentSchema = new mongoose.Schema({
    trackingNumber: { type: String, required: true }, 
    status: { type: String, required: true }, 
});

const Item = mongoose.model('Item', itemSchema);
const Shipment = mongoose.model('Shipment', shipmentSchema);

// API to add inventory items
app.post('/api/inventory', async (req, res) => {
    const { name, quantity } = req.body;

    // Validate input
    if (!name || !quantity) {
        return res.status(400).json({ message: 'Name and quantity are required' });
    }

    const newItem = new Item({ name, quantity });
    await newItem.save();
    res.status(201).send(newItem);
});

// API to get all inventory items
app.get('/api/inventory', async (req, res) => {
    try {
        const items = await Item.find(); // Fetch all items from the database
        res.status(200).json(items); // Send the items as a response
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items' });
    }
});


// API to add shipments
app.post('/api/shipments', async (req, res) => {
    const { trackingNumber, status } = req.body;

    // Validate input
    if (!trackingNumber || !status) {
        return res.status(400).json({ message: 'Tracking number and status are required' });
    }

    const newShipment = new Shipment({ trackingNumber, status });
    await newShipment.save();
    res.status(201).send(newShipment);
});

// API to get all shipments
app.get('/api/shipments', async (req, res) => {
    try {
        const shipments = await Shipment.find(); // Retrieve all shipments
        res.status(200).json(shipments); // Send the shipments as a JSON response
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving shipments' });
    }
});

// API to get a shipment by ID
app.get('/api/shipments/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const shipment = await Shipment.findById(id); // Find shipment by ID
        if (!shipment) {
            return res.status(404).json({ message: 'Shipment not found' });
        }
        res.status(200).json(shipment); // Send the shipment as a JSON response
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving shipment' });
    }
});

// Serve index.html on root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/public', 'index.html')); // Adjust this path if necessary
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
