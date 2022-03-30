pragma solidity >=0.4.25 <0.7.0;

import "./ERC20.sol";
import "./Campaigns.sol";
import "./User.sol";


contract Litres is ERC20 {

    uint256 constant private MAX_UINT256 = 2**256 - 1;
    mapping (address => uint256) public balances;
    mapping (address => mapping (address => uint256)) public allowed;
    /*
    NOTE:
    The following variables are OPTIONAL vanities. One does not have to include them.
    They allow one to customise the token contract & in no way influences the core functionality.
    Some wallets/interfaces might not even bother to look at this information.
    */
    string public name;                   //fancy name: eg Simon Bucks
    uint8 public decimals;                //How many decimals to show.
    string public symbol;            
    address campaignsAddress;
    address usersAddress;        
    address public creator;      //An identifier: eg SBX

    constructor(
        uint256 _initialAmount,
        string memory _tokenName,
        uint8 _decimalUnits,
        string memory _tokenSymbol,
        address _campaignsAddress,
        address _usersAddress
    ) public {
        balances[msg.sender] = _initialAmount;               // Give the creator all initial tokens
        totalSupply = _initialAmount;                        // Update total supply
        name = _tokenName;                                   // Set the name for display purposes
        decimals = _decimalUnits;                            // Amount of decimals for display purposes
        symbol = _tokenSymbol; 
        campaignsAddress = _campaignsAddress;
        usersAddress = _usersAddress;
        creator = msg.sender;                              // Set the symbol for display purposes
    }
    
    // function getNum() public returns(string memory str){
        
    //     return name;
    // }

    function setCampaignsAddress(address _address) public {
        campaignsAddress = _address;
    }
    function setUserAddress(address _address) public {
        usersAddress = _address;
    }

    function donateToCampaign(address _to, uint256 _value, uint _campaignID,uint _timestamp) public{
        transfer(_to,_value);
        Campaigns campaigns = Campaigns(campaignsAddress);
        campaigns.updateAmountRaised(_to,_campaignID,_value);
        User user = User(usersAddress);
        user.createTransaction(msg.sender,_to,_value,_campaignID,campaigns.campaignName,_timestamp);
        emit Transfer(msg.sender, _to, _value);
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balances[msg.sender] >= _value);
        balances[msg.sender] -= _value;
        balances[_to] += _value;
         //solhint-disable-line indent, no-unused-vars
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        uint256 allowance = allowed[_from][msg.sender];
        require(balances[_from] >= _value && allowance >= _value);
        balances[_to] += _value;
        balances[_from] -= _value;
        if (_from != creator && allowance < MAX_UINT256) {
            allowed[_from][msg.sender] -= _value;
        }
        emit Transfer(_from, _to, _value); //solhint-disable-line indent, no-unused-vars
        return true;
    }

    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value); //solhint-disable-line indent, no-unused-vars
        return true;
    }

    function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }
}