// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TransactionLogger {
    struct Record {
        uint256 timestamp;
        string jsonSAPResponse;
        string responseStatus;
        string sourcePlatform;
    }

    Record[] public records;

    function storeRecord(uint256 _timestamp, string memory _jsonSAPResponse, 
        string memory _responseStatus, string memory _sourcePlatform) public {
            
        Record memory newRecord = Record({
            timestamp: _timestamp,
            jsonSAPResponse: _jsonSAPResponse,
            responseStatus: _responseStatus,
            sourcePlatform: _sourcePlatform
        });
        
        records.push(newRecord);
    }

    function getRecordCount() public view returns (uint256) {
        return records.length;
    }

    function getRecord(uint256 index) public view returns (uint256, string memory, string memory, string memory) {
        require(index < records.length, "Record does not exist");
        
        Record storage record = records[index];
        return (record.timestamp, record.jsonSAPResponse, record.responseStatus, record.sourcePlatform);
    }
}
