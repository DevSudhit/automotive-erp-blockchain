const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const Web3 = require('web3').default; // Add .default to the import

const app = express();
const PORT = process.env.PORT || 5001;

app.use(bodyParser.json());

// Serve static files from the frontend/public directory
app.use(express.static(path.join(path.resolve(), 'public'))); 

// Set up Web3
const web3 = new Web3('http://127.0.0.1:8545'); // Ethereum node address

// Load contract ABI and address
const inventoryContractABI = JSON.parse(fs.readFileSync(path.join(path.resolve(), 'build/contracts/InventoryContract.json'))).abi;
const shipmentContractABI = JSON.parse(fs.readFileSync(path.join(path.resolve(), 'build/contracts/ShipmentContract.json'))).abi;

const contractAddressInventory = '0xAc38Cc2e8339a718de4e955bd7964e2A09bFC0a5'; // Inventory contract address
const contractAddressShipment = '0x6A44C8ef6a1b6B417e3fa5CD9f36b720Deb4003e'; // Shipment contract address

const inventoryContract = new web3.eth.Contract(inventoryContractABI, contractAddressInventory);
const shipmentContract = new web3.eth.Contract(shipmentContractABI, contractAddressShipment);

// API to add inventory items
app.post('/api/inventory', async (req, res) => {
    const { id, name, quantity } = req.body;

    if (!id || !name || !quantity) {
        return res.status(400).json({ message: 'ID, name, and quantity are required' });
    }

    const accounts = await web3.eth.getAccounts();
    
    try {
        const gasPrice = await web3.eth.getGasPrice(); // Get current gas price
        const gasLimit = 300000; // Set an appropriate gas limit
        await inventoryContract.methods.addItem(id, name, quantity).send({ from: accounts[0], gasPrice: gasPrice, gas: gasLimit });
        res.status(201).send({ message: 'Item added to smart contract successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error adding item to smart contract' });
    }
});

// API to get all inventory items
app.get('/api/inventory', async (req, res) => {
    try {
        const itemCount = await inventoryContract.methods.itemCount().call();
        const items = [];

        for (let i = 1; i <= itemCount; i++) {
            const item = await inventoryContract.methods.getItem(i).call();
            items.push({ id: item[0].toString(), name: item[1], quantity: item[2].toString() }); // Ensure proper conversion
        }

        res.status(200).json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching items from smart contract' });
    }
});


// API to add shipments
app.post('/api/shipments', async (req, res) => {
    const { trackingNumber, status } = req.body;

    if (!trackingNumber || !status) {
        return res.status(400).json({ message: 'Tracking number and status are required' });
    }

    const accounts = await web3.eth.getAccounts();
    try {
        const gasPrice = await web3.eth.getGasPrice();
        const gasLimit = 300000;
        await shipmentContract.methods.createShipment(trackingNumber, status).send({ from: accounts[0], gasPrice, gas: gasLimit });
        res.status(201).send({ message: 'Shipment created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error creating shipment' });
    }
});



// API to get all shipments
app.get('/api/shipments', async (req, res) => {
    try {
        const shipmentCount = await shipmentContract.methods.shipmentCount().call();
        const shipments = [];

        for (let i = 1; i <= shipmentCount; i++) {
            const shipment = await shipmentContract.methods.getShipment(i).call();
            shipments.push({ 
                id: shipment[0].toString(), // Ensure proper conversion
                trackingNumber: shipment[1], 
                status: shipment[2] 
            });
        }

        res.status(200).json(shipments);
    } catch (error) {
        console.error('Error retrieving shipments:', error);
        res.status(500).json({ message: 'Error retrieving shipments' });
    }
});




// Serve index.html on root route
app.get('/', (req, res) => {
    res.sendFile(path.join(path.resolve(), '../frontend/public', 'index.html')); 
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//dummy commit
