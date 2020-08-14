pragma solidity ^0.5.0;

contract TestContract {

    uint amount;

    string message = "placeholder";

    constructor(uint _amount) public {
        amount = _amount + 20;
    }

    function print() public returns (string memory) {
        return message;
    }
}
