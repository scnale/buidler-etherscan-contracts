pragma solidity ^0.4.11;

contract TestContract {

    uint amount;

    string message = "placeholder";

    function TestContract(uint _amount) public {
        amount = _amount + 20;
    }

    function print() public returns(string) {
        return message;
    }
}
