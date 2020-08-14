pragma solidity ^0.5.0;

library TestLibrary {
    function libDo(uint256 n) external returns (uint256) {
        return n * 2;
    }
}

contract TestContractLib {

    uint amount;

    string message = "placeholder";

    constructor(uint _amount) public {
        amount = _amount + 20;
    }

    function print() public returns (string memory) {
        return message;
    }

    function printNumber() public returns (uint256) {
        uint result = TestLibrary.libDo(amount);
        return result;
    }
}
