const express = require('express');
const bodyParser = require('body-parser');
const inventoryRoutes = require('./api/inventory');
const shipmentRoutes = require('./api/shipments');

const app = express();
app.use(bodyParser.json());

// Routes
app.use('/api/inventory', inventoryRoutes);
app.use('/api/shipments', shipmentRoutes);

const PORT = process.env.PORT || 5001; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
