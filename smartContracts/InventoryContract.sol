pragma solidity ^0.8.0;

contract InventoryContract {
    struct Item {
        uint id;
        string name;
        uint quantity;
    }

    mapping(uint => Item) public items;

    function addItem(uint _id, string memory _name, uint _quantity) public {
        items[_id] = Item(_id, _name, _quantity);
    }

    function getItem(uint _id) public view returns (Item memory) {
        return items[_id];
    }
}
