pragma solidity >=0.4.25 <0.7.0;
contract Campaigns {
    struct Campaign {
        uint campaignID;
        address owner;
        string campaignName;
        string aboutHash;
        string imageHash;
        uint amountToRaise;
        uint amountRaised;
        bool targetReached;
        string category1;
      
        uint numberOfDonations;
    }

mapping(uint => Campaign) public campaigns;

uint public numberOfCampaigns = 0;

event createCampaignEvent(uint campaignID,address owner,string campaignName, string aboutHash, string imageHash, uint amountToRaise,string category1);

    function createCampaign(address owner,string memory campaignName, string memory aboutHash, string memory imageHash, uint amountToRaise,string memory category1) public {
        numberOfCampaigns++;
        campaigns[numberOfCampaigns] = Campaign(numberOfCampaigns,owner,campaignName,aboutHash,imageHash,amountToRaise,0,false,category1,0);
        emit createCampaignEvent(numberOfCampaigns,owner,campaignName, aboutHash,imageHash,amountToRaise,category1);
    }

}