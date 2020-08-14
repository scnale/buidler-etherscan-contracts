pragma solidity ^0.4.11;

library TestLibrary {
    function libDo(uint256 n) returns (uint256) {
        return n * 2;
    }
}

contract TestContractLib {

    uint amount;

    string message = "placeholder";

    function TestContractLib(uint _amount) public {
        amount = _amount + 20;
    }

    function print() public returns (string) {
        return message;
    }

    function printNumber() public returns (uint256) {
        uint result = TestLibrary.libDo(amount);
        return result;
    }
}
