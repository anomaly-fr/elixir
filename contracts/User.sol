pragma solidity >=0.4.25 <0.7.0;

contract User {
address private ethAddress;
string private userType;

constructor(address _ethAddress) public{
ethAddress = _ethAddress;
userType = "giver";
}

function getAddress() public view returns (address _address) {
return ethAddress;
}

function setUserType(uint _userType) public{
    if(_userType == 0){
        userType = "giver";
    }else if(_userType == 1){
        userType = "taker";
    }else if(_userType == 2){
        userType = "charity";
    }
}

function getUserType() public view returns (string _userType){
    return userType;
}

}