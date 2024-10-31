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
   git clone https://github.com/DevSudhit/automotive-erp-blockchain.git
   cd automotive-erp-blockchain

2. **Install dependencies for the backend:**
    cd backend
    npm install

3. **Start MongoDB:**
    mongod

4. **Start the server:**
    npm start


## Usage
If you want to use the smart contract functionality, switch to the `blockchain_main` branch and follow these additional steps:

1. **Switch to the blockchain branch:**
   ```bash
   git checkout blockchain_main
2. **Set up your Ethereum environment** (like Ganache or a test network) and ensure it’s running.

3. **Deploy your smart contract** using a tool like Truffle or Hardhat, and update the contractAddress in your server.js file accordingly.

4. **Ensure your Web3.js** configuration points to the correct Ethereum node.

5. **Add items or shipments via the API** and verify that transactions are recorded on the blockchain.


