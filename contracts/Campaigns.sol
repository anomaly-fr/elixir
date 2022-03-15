pragma solidity >=0.4.25 <0.7.0;
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

uint public numberOfCampaigns = 0;

event createCampaignEvent(uint campaignID,address owner,string ownerName,string campaignName, string aboutHash, string imageHash, uint amountToRaise,string category);

    function createCampaign(address owner,string memory ownerName,string memory campaignName, string memory aboutHash, string memory imageHash, uint amountToRaise,string memory category) public {
        numberOfCampaigns++;
        campaigns[numberOfCampaigns] = Campaign(numberOfCampaigns,owner,ownerName,campaignName,aboutHash,imageHash,amountToRaise,0,category,0);
        emit createCampaignEvent(numberOfCampaigns,owner,ownerName,campaignName, aboutHash,imageHash,amountToRaise,category);
    }

}