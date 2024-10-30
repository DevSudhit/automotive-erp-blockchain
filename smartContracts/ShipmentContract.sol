pragma solidity ^0.8.0;

contract ShipmentContract {
    struct Shipment {
        uint id;
        string trackingNumber;
        string status; // Pending, Shipped, Delivered
    }

    mapping(uint => Shipment) public shipments;
    uint public shipmentCount;

    function createShipment(string memory _trackingNumber) public {
        shipmentCount++;
        shipments[shipmentCount] = Shipment(shipmentCount, _trackingNumber, "Pending");
    }

    function updateStatus(uint _id, string memory _status) public {
        require(_id > 0 && _id <= shipmentCount, "Invalid shipment ID");
        shipments[_id].status = _status;
    }

    function getShipment(uint _id) public view returns (Shipment memory) {
        require(_id > 0 && _id <= shipmentCount, "Invalid shipment ID");
        return shipments[_id];
    }
}
