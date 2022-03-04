pragma solidity >=0.4.25 <0.7.0;
pragma experimental ABIEncoderV2;

contract Users {


address creator;

constructor() public {
    creator = msg.sender;
}

struct Transaction {
    address _otherAddress;  // from where tokens came or to where they were sent
    uint amount;
    bool symbol;    // + or -
     
}

struct User {

bool type1;
bool type2;
bool type3;     // 0 = user does not exist
                // 1 = donor
                // 2 = beneficiary
                // 3 = volunteer


}

mapping(address => User) public users;
mapping(address => Transaction[]) transactions;

event CreatedUser(address _address);

function createUser(address _address) public {

    users[_address] = User(true,false,false);
    emit CreatedUser(_address);
}


function isType1(address _address) public view returns(bool _value){
    return users[_address].type1;
}

function isType2(address _address) public view returns(bool _value){
    return users[_address].type2;
}

function isType3(address _address) public view returns(bool _value){
    return users[_address].type3;
}

event TypeAdded(address _address,uint typeNumber);
function addType(address _address,uint typeNumber) public {
require(users[_address].type1,"User does not exist");
if(typeNumber == 2){
    users[_address].type2 = true;
}else if(typeNumber == 3){
    users[_address].type3 = true;
}
emit TypeAdded(_address,typeNumber);
}

function getTransactions(address _address) public view returns(Transaction[] memory){
    // Transaction[] memory trans = new Transaction[](transactions[_address].length);
    // return trans;
    return transactions[_address];
}

event CreatedTransaction(address _address,address _otherAddress,uint _amount,bool _symbol);

function createTransaction(address _address,address _otherAddress,uint _amount,bool _symbol) public {
    transactions[_address].push(Transaction(_otherAddress,_amount,_symbol));
    emit CreatedTransaction(_address,_otherAddress,_amount,_symbol);
}




}

