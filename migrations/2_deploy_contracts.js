const InventoryContract = artifacts.require("InventoryContract");
const ShipmentContract = artifacts.require("ShipmentContract");

module.exports = function(deployer) {
    deployer.deploy(InventoryContract);
    deployer.deploy(ShipmentContract);
};
