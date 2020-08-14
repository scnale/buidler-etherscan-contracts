pragma solidity ^0.7.0;

contract TestContractImmutables {

    uint immutable amount;

    constructor(uint _amount) public {
        amount = (_amount + 20) * 2;
    }

    function printNumber() public returns (uint256) {
        return amount;
    }
}
