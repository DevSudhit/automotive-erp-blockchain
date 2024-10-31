pragma solidity ^0.5.16;

contract InventoryContract {
    struct Item {
        uint id;
        string name;
        uint quantity;
    }

    mapping(uint => Item) public items;
    uint public itemCount; // Track number of items

    function addItem(uint _id, string memory _name, uint _quantity) public {
        items[_id] = Item(_id, _name, _quantity);
        itemCount++; // Increment the item count
    }

    function getItem(uint _id) public view returns (uint, string memory, uint) {
        Item memory item = items[_id];
        return (item.id, item.name, item.quantity);
    }
}
