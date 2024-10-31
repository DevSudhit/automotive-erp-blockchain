# Automotive ERP System over Blockchain Technology

## Introduction
This project implements an Automotive ERP system utilizing blockchain technology to enhance transparency, security, and efficiency within the automotive supply chain.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used
- **Node.js**: Backend server
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database for storing data
- **Web3.js**: Library to interact with Ethereum blockchain
- **Solidity**: Smart contract programming language
- **React**: Frontend framework (if applicable)

## Features
- Data immutability and integrity
- Smart contracts for automated processes
- Real-time tracking of automotive parts
- Enhanced transparency across stakeholders

## Installation
To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd automotive-erp-blockchain

2. **Install dependencies for the backend:**
    cd backend
    npm install

3. **Start MongoDB:**
    mongod

4. **Start the server:**
    npm start


## Setup Instructions For Etherium Contract

1. Clone the Repository
```bash
    git clone <repository-url>
    cd automotive-erp-blockchain

2. **Install Dependencies**
    Navigate to the backend directory and install the necessary packages:

    ```bash
    Copy code
    cd backend
    npm install

3. **Install Truffle and Ganache**
    Globally install Truffle and Ganache:
    ```bash
    Copy code
    npm install -g truffle
    npm install -g ganache

4. **Start Ganache**
    Open a terminal and start Ganache:
    ```bash
    Copy code
    ganache
    This will start a local blockchain at http://localhost:8545.

5. **Deploy Smart Contracts**
    Make sure you are in the backend directory, and then migrate your smart contracts:
    ```bash
    Copy code
    npx truffle migrate --network development

6. **Start the Server**
    Run the server to interact with the smart contracts:
    ```bash
    Copy code
    npm start
    The server will run on http://localhost:5001.

## API Endpoints

1. **Inventory**
    Add Inventory Item

    Endpoint: POST /api/inventory
    Body:
    json
    Copy code
    {
    "id": "item_id",
    "name": "item_name",
    "quantity": "item_quantity"
    }
    Get All Inventory Items

    Endpoint: GET /api/inventory

2. **Shipments**
    Add Shipment

    Endpoint: POST /api/shipments
    Body:
    json
    Copy code
    {
    "trackingNumber": "tracking_number"
    }
    Get All Shipments

    Endpoint: GET /api/shipments
