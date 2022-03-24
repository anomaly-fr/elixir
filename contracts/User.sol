pragma solidity >=0.4.25 <0.7.0;
pragma experimental ABIEncoderV2;

contract User {

struct Transaction {
    address toAddress;
    uint amount;
    uint campaignID;
    uint timeStamp;
}
    mapping(address => Transaction[]) public transactions;

    function createTransaction(address _fromAddress,address _toAddress,uint _amount,uint _campaignID,uint _timestamp) public returns(bool success){
        transactions[_fromAddress].push(Transaction(_toAddress,_amount,_campaignID,_timestamp));
        return true;
    }

    function getTransactions(address _address) public view returns (Transaction[] memory _transactions){
        return transactions[_address];
    }
    function getTransactionCount(address _address) public view returns (uint _number){
    return transactions[_address].length;
    }


}

