pragma solidity >=0.4.25 <0.7.0;
pragma experimental ABIEncoderV2;
contract Campaigns {
    
    struct Campaign {
        uint campaignID;
        address owner;
        string ownerName;
        string campaignName;
        string aboutHash;
        string imageHash;
        uint amountToRaise;
        uint amountRaised;
        string category;
        uint numberOfDonations;
        
    }

mapping(uint => Campaign) public campaigns; 
mapping(address => mapping(uint => Campaign)) public userCampaigns;

uint public numberOfCampaigns = 0;

event createCampaignEvent(uint campaignID,address owner,string ownerName,string campaignName, string aboutHash, string imageHash, uint amountToRaise,string category);

    function createCampaign(address owner,string memory ownerName,string memory campaignName, string memory aboutHash, string memory imageHash, uint amountToRaise,string memory category) public {
        numberOfCampaigns++;
        
        campaigns[numberOfCampaigns] = Campaign(numberOfCampaigns,owner,ownerName,campaignName,aboutHash,imageHash,amountToRaise,0,category,0);
        userCampaigns[owner][numberOfCampaigns] = Campaign(numberOfCampaigns,owner,ownerName,campaignName,aboutHash,imageHash,amountToRaise,0,category,0);
        emit createCampaignEvent(numberOfCampaigns,owner,ownerName,campaignName, aboutHash,imageHash,amountToRaise,category);
    }

    function getUserCampaigns(address _address,uint _campaignID) public view returns (Campaign memory _campaign){
        return userCampaigns[_address][_campaignID];
    }

event amountRaisedUpdated(uint _newValue);
    function updateAmountRaised(address _contractOwner,uint _campaignID,uint _value) public {
        campaigns[_campaignID].amountRaised = campaigns[_campaignID].amountRaised + _value;
        campaigns[_campaignID].numberOfDonations++;
        userCampaigns[_contractOwner][_campaignID].amountRaised = userCampaigns[_contractOwner][_campaignID].amountRaised + _value;
        userCampaigns[_contractOwner][_campaignID].numberOfDonations++;
    }

}