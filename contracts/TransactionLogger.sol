// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract TransactionLogger {
    string private loggedData;
    
    constructor(string memory _loggedData) {
        console.log("Deploying a Transaction Logger", _loggedData);
        loggedData = _loggedData;
    }

    function fetchLoggedData() public view returns (string memory) {
        return loggedData;
    }

    function logData(string memory _loggedData) public {
        console.log("Logging data:", _loggedData);
        loggedData = _loggedData;
    }

    receive() external payable {
        // none
    }
}
