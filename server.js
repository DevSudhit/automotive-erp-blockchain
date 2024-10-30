const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const Web3 = require('web3');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(bodyParser.json());

// Serve static files from the frontend/public directory
app.use(express.static(path.join(__dirname, 'public'))); 

// Connect to MongoDB (optional, added to keep using it for other features)
mongoose.connect('mongodb://localhost:27017/automotive_erp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Set up Web3
const web3 = new Web3('http://localhost:8545'); // Ethereum node address
const contractABI = [/* ABI from your compiled contract */];
const contractAddress = '0xYourContractAddress'; // Replace with your deployed contract address
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Define Shipment schema
const shipmentSchema = new mongoose.Schema({
    trackingNumber: { type: String, required: true }, 
    status: { type: String, required: true }, 
});

const Shipment = mongoose.model('Shipment', shipmentSchema);

// API to add inventory items via smart contract
app.post('/api/inventory', async (req, res) => {
    const { name, quantity } = req.body;

    // Validate input
    if (!name || !quantity) {
        return res.status(400).json({ message: 'Name and quantity are required' });
    }

    const accounts = await web3.eth.getAccounts();
    
    try {
        // Call the smart contract method to add the item
        await contract.methods.addItem(name, quantity).send({ from: accounts[0] });
        res.status(201).send({ message: 'Item added to smart contract successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error adding item to smart contract' });
    }
});

// API to get all inventory items from the smart contract
app.get('/api/inventory', async (req, res) => {
    try {
        const itemCount = await contract.methods.itemCount().call();
        const items = [];

        for (let i = 1; i <= itemCount; i++) {
            const item = await contract.methods.getItem(i).call();
            items.push({ name: item[0], quantity: item[1] });
        }

        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items from smart contract' });
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
        const shipments = await Shipment.find(); 
        res.status(200).json(shipments);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving shipments' });
    }
});

// Serve index.html on root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/public', 'index.html')); 
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
